import { InputType, Field } from "type-graphql";

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
