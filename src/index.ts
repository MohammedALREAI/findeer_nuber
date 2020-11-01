import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm";
import app from "./app";
import { connectionOptions } from "./ormconfig";
import { optionsJWT } from "./utils/decodeJWT";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async (connectionParams) => {
      const token = connectionParams["X-JWT"];
      if (token) {
        const user = await optionsJWT.decodeJWT(token);
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

createConnection(connectionOptions)
  .then(() => {
    app.start(appOptions, () => {
      console.log(`Listening on port ${PORT} 💥💥💥`);
    });
  })
  .catch((error) => console.log(error));
