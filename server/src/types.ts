import { InputType, Field, ObjectType, ID } from "type-graphql";
import { Question } from "./entities/Question";

@InputType()
export class UserInput {
  @Field(() => String)
  username!: string;
  @Field(() => String)
  firstName!: string;
  @Field(() => String)
  lastName!: string;
  @Field(() => String)
  email!: string;
  @Field(() => String)
  password!: string;
}

@InputType()
export class LoginInput {
  @Field(() => String)
  username!: string;
  @Field(() => String)
  password!: string;
}

@InputType()
export class AnswerInput {
  @Field(() => String)
  hash!: string;
  @Field(() => Boolean)
  isInCast!: boolean;
}

@ObjectType()
export class Actor {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  profile_url: string   
}

@ObjectType()
export class Movie {
	@Field(() => ID)
  id: number;

	@Field()
  poster_url: string;

	@Field()
  title: string;

	@Field()
  overview: string;
}


@ObjectType()
export class Answer {
  @Field(() => ID)
  hash: string;

  @Field()
  isCorrect: boolean;
}
