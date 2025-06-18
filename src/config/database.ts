import 'reflect-metadata'
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
dotenv.config();


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    synchronize: true,// false in prod
    logging: true,
    entities: [__dirname + '/../entities/*.ts'],
    migrations: ["src/migrations/*.ts"]
    
})