import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entities/User";
import { LoginInput, LoginResponse, MyContext, RegisterResponse, UserInput } from "../types";
import crypto from 'crypto';
import { validate } from "class-validator";
import { convertValidationErrors } from "../utils/errorUtils";
import { isAuth, signToken } from "../utils/isAuth";
import { AuthenticationError } from "apollo-server-express";

@Resolver()
export class UserResolver {

  private hashPassword(password: string): string {
    const hash = crypto.createHash("sha256");
    return hash.update(password).digest('hex');
  }

  @Mutation(() => RegisterResponse)
  async register(@Arg("input") input: UserInput): Promise<RegisterResponse> {
    
    const validationErrors = await validate(input);

    if (validationErrors.length) {
      return {
        errors: convertValidationErrors(validationErrors)
      };
    }

    const emailExistUser = await User.findOne({ where: { email: input.email } });
    if (emailExistUser) {
      return {
        errors: [{
          field: 'email',
          message: 'E-mail already taken'
        }]
      };
    }

    const usernameExistUser = await User.findOne({ where: { username: input.username } });
    if (usernameExistUser) {
      return {
        errors: [{
          field: 'username',
          message: 'username already taken'
        }]
      };
    }

    const { password } = input;
    const hashedPassword = this.hashPassword(password);
    const user = await User.create({...input, password: hashedPassword}).save();

    return {
      user
    };
  }

  @Mutation(() => LoginResponse)
  async login(@Arg("input") input: LoginInput): Promise<LoginResponse> {
    const { username, password } = input;
    const hashedPassword = this.hashPassword(password);
    const user = await User.findOne({ where: { username, password: hashedPassword } });

    if (!user) {
      throw new AuthenticationError("incorrect username or password");
    }

    return {
      user,
      accessToken: signToken({ userId: user.id })
    }
  }

  @Query(() => User, { nullable: true })
  async getByUsername(@Arg("username") username: string): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }

  @Query(() => User, {nullable: true})
  @UseMiddleware(isAuth)
  async me(@Ctx() { payload }: MyContext) {
    return User.findOne({ where: { id: payload?.userId } });
  }
}
