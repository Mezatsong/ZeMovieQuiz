import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { UserResolver } from "../resolvers/index";

export const createSchema = (): Promise<GraphQLSchema> =>
  buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });
