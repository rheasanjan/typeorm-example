import {createConnection} from "typeorm";
import SuperHero from "../entity/SuperHero"
import Power from "../entity/Power"
import { Config } from "../config";

export const Connection = createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    entities: [
        SuperHero,
        Power,
    ],
    synchronize: true,
    logging: false,
})