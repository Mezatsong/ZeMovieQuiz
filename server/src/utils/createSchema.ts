import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver, MovieQuizResolver } from "../resolvers/index";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [UserResolver, MovieQuizResolver],
    validate: false,
  });
