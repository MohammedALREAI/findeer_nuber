import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import connectionOptions from "./ormConfig";
import decodeJWT from "./utils/decodeJWT";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT = "/playground";
const GRAPHQL_ENDPOINT = "/graphql";
const SUBSCRIPTION_ENDPOINT = "/subscription";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async connectionParams => {
      const token = connectionParams["X-JWT"];
      if (token) {
        const user = await decodeJWT(token);
        if (user) {
          return {
            currentUser: user,
          };
        }
      }
      throw new Error("No JWT. Can't subscribe");
    },
  },
};

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions)
  .then(() => {
    console.log("the Database start to connecation");
    app.start(appOptions, handleAppStart);
  })
  .catch(error => console.log(error));
