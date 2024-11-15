import { DataSource } from "typeorm";

export const PostGresDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  entities: [
    process.env.NODE_ENV !== "production" ?
      process.cwd() + "/../src/**/*.entity.ts"
    : process.cwd() + "/**/*.entity.js",
  ],
  migrations: ["src/migrations/*.ts"],
  migrationsTableName: "migrations",
  logging: true,
});
