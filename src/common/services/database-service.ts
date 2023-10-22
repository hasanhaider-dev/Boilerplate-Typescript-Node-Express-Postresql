import "reflect-metadata";

import { Client } from 'pg'
import { Service } from "typedi";

import config from "../../config";
import { logger } from "../../utils";

@Service()
export class DatabaseService {
    private client: Client;

    public async initializeAndConnectDB(): Promise<any> {
        try {
            const client = new Client({
                user: config.database.username,
                host: config.database.host,
                database: config.database.name,
                password: config.database.password,
                port: config.database.port,
            })

            await client.connect()

            client.query("CREATE TABLE IF NOT EXISTS assets(ID UUID PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(), Name VARCHAR(50),Type VARCHAR(50), hidden BOOLEAN NOT NULL DEFAULT FALSE, created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW())", (err, res) => {
                if (err != null) {
                    logger.error(
                        "DATABASE_SERVICE.initializeAndConnectDB: Error creating assets table: ",
                        err
                    );
                }
                logger.info("created tables successfully")
            });

            this.client = client;
        } catch (err) {
            logger.error(
                "DATABASE_SERVICE.initializeAndConnectDB: Error connecting to Database: ",
                err
            );
        }
    }
    public getDBClient(): Client {
        return this.client;
    }
}
