/*
// import mongoose from 'mongoose'
import { env } from "../../infrastructure/env";
import { logger } from "../../api/lib/logger";
// @ts-ignore
import { DataSource, DataSourceOptions } from "typeorm";
// @ts-ignore
import { runSeeders, SeederOptions } from "typeorm-extension";
import path from "path"


export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: 3306,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  // synchronize: true,
  logging: false,
  entities:[
    path.join(__dirname, "../", `domain/entities/*{.ts,.js}`), 
    path.join(__dirname, "../", `domain/entities/v2/*{.ts,.js}`), 
    path.join(__dirname, "../", `domain/entities/admin/*{.ts,.js}`)
  ],
  migrations: [path.join(__dirname, "../", `domain/migration/*{.ts,.js}`)],
  extra: {
    ssl: {
        rejectUnauthorized: false, // Adjust based on your security requirements
    },
  },
  // ssl: {
  //     "rejectUnauthorized": false // Set to true for production environments with proper SSL certificates
  // }
  // cache: true
  // cache: {
  //     type: "ioredis",
  //     options: [
  //         {
  //             host: 'localhost',
  //             port: 7000,
  //         },
  //         {
  //             host: 'localhost',
  //             port: 7001,
  //         },
  //         {
  //             host: 'localhost',
  //             port: 7002,
  //         }
  //     ],
  //     ignoreErrors: true,
  //     duration: 60000
  // }
})


// export const PostgresDataSource = new DataSource(options);
AppDataSource.initialize()
  .then(async () => {
    console.log("✅ Connected to MySQL Database");
  })
   .catch((error: any) => {
    console.error("❌ Database connection failed:", error);
  });

*/

import { env } from "../../infrastructure/env";
import { logger } from "../../api/lib/logger";
import { DataSource } from "typeorm";
import path from "path";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: 5432, // Default PostgreSQL port
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  // ssl : true,
  //  synchronize: true, // Use only in dev
  logging: false,
  entities: [
    path.join(__dirname, "../", `domain/entities/*{.ts,.js}`),
    path.join(__dirname, "../", `domain/entities/v2/*{.ts,.js}`),
    path.join(__dirname, "../", `domain/entities/admin/*{.ts,.js}`)
  ],
  migrations: [path.join(__dirname, "../", `domain/migration/*{.ts,.js}`)],
  extra: {
    ssl: {
        rejectUnauthorized: false, // Adjust based on your security requirements
    },
  },
});

AppDataSource.initialize()
  .then(async () => {
    console.log("✅ Connected to PostgreSQL Database");
  })
  .catch((error: any) => {
    console.error("❌ Database connection failed:", error);
  });
