import { config } from "./Config";
import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  database: config.database || "findme",
  synchronize: true,
  logging: true,
  host: config.host || "localhost",
  port: Number(config.db_port) || 5432,
  username: config.username || "postgres",
  password: config.password || "postgress",
  entities: ["entities/**/*.*"],
  migrations: ["migration/**/*.ts"],
  subscribers: ["subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export default connectionOptions;
