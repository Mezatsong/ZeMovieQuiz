import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { UserInput } from "../types";
import crypto from 'crypto';

@Resolver()
export class userResolver {
  @Mutation(() => User)
  async register(@Arg("input") input: UserInput): Promise<User | undefined> {
    const { password } = input;
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    return User.create({...input, password: hashedPassword}).save();
  }

  @Query(() => User, { nullable: true })
  async getByUsername(
    @Arg("username") username: string
  ): Promise<User | undefined> {
    return User.findOne({ where: { username } });
  }
}
