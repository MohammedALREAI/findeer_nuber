import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";
import * as path from "path";
import * as fs from "fs";
import { makeExecutableSchema } from "graphql-tools";
import * as glob from "glob";

export const useSchema = () => {
  const pathToModules = path.join(__dirname);

  const graphqlTypes = glob
    .sync(`${pathToModules}/api/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: "utf8" }));

  const resolvers = glob
    .sync(`${pathToModules}/api/**/*.resolvers.ts`)
    .map(resolver => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers),
  });
};
