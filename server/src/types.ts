import { InputType, Field, ObjectType, ID } from "type-graphql";
import { IsEmail, MinLength } from "class-validator";
import { User } from "./entities/User";
import { Request, Response } from "express";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class RegisterResponse {
  @Field(() => [FieldError], { nullable: true})
  errors?: FieldError[]

  @Field(() =>User, { nullable: true})
  user?: User
}

@InputType()
export class UserInput {

  @Field(() => String)
  @MinLength(2)
  username!: string;

  @Field(() => String)
  firstName!: string;

  @Field(() => String)
  lastName!: string;

  @Field(() => String)
  @IsEmail()
  email!: string;

  @Field(() => String)
  @MinLength(6)
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


@ObjectType()
export class LoginResponse {
  @Field(() => User)
  user: User;

  @Field()
  accessToken: string;
}

export interface MyContext {
  req: Request;
  res: Response;
  payload?: { userId: number };
}
