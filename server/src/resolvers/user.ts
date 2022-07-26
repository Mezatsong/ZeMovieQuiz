import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { LoginInput, UserInput } from "../types";
import crypto from 'crypto';

@Resolver()
export class UserResolver {

  private hashPassword(password: string): string {
    const hash = crypto.createHash("sha256");
    return hash.update(password).digest('hex');
  }

  @Mutation(() => User)
  async register(@Arg("input") input: UserInput): Promise<User | undefined> {
    const { password } = input;
    const hashedPassword = this.hashPassword(password);
    return User.create({...input, password: hashedPassword}).save();
  }

  @Mutation(() => User, { nullable: true })
  async login(@Arg("input") input: LoginInput): Promise<User | undefined> {
    const { username, password } = input;
    const hashedPassword = this.hashPassword(password);
    return User.findOne({ where: { username, password: hashedPassword } });
  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }
}
