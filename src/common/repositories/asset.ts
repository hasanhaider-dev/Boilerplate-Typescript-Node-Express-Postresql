import "reflect-metadata";

import { Client } from "pg";
import { Inject, Service } from "typedi";

import { logger } from "../../utils";
import { DbResponseModel } from "../models";
import { Asset } from "../models/asset";
import { DatabaseService } from "../services";

@Service()
export class AssetRepo {
    private dbClient: Client;

    constructor(@Inject() private readonly databaseService: DatabaseService) {
        this.dbClient = this.databaseService.getDBClient();
    }

    public async create(asset: Asset): Promise<DbResponseModel<Asset>> {
        try {
            logger.info("AssetRepo.addItem: Adding new item in assets: ", asset);

            const query = `INSERT INTO assets(name, type) VALUES($1, $2) RETURNING *`;
            const values = [asset.name, asset.type];

            const result = (await this.dbClient.query(query, values)).rows;
            return {
                success: true,
                payload: {
                    createdAt: result[0].created_at,
                    id: result[0].id,
                    name: result[0].name,
                    type: result[0].type,
                },
            };
        } catch (error) {
            logger.error(
                "AssetRepo.addItem: Error occured while adding item in assets: ",
                error
            );

            return {
                success: false,
                payload: null,
                error: error,
            };
        }
    }

    public async getByID(ID: string): Promise<DbResponseModel<Asset>> {
        try {
            logger.info("AssetRepo.getByID: getting asset with ID: ", ID);
            const query = `Select * FROM assets where id = $1 and hidden = false`;
            const result = (await this.dbClient.query(query, [ID])).rows;
            if (result.length == 0) {
                return {
                    success: false,
                    payload: null,
                    error: null,
                };
            }
            else {
                return {
                    success: true,
                    payload: {
                        createdAt: result[0].created_at,
                        id: result[0].id,
                        name: result[0].name,
                        type: result[0].type,
                    },
                };
            }
        } catch (error) {
            logger.error(
                "AssetRepo.getByID: Error occured while getting asset: ",
                error
            );

            return {
                success: false,
                payload: null,
                error: error,
            };
        }
    }

    public async getAll(): Promise<DbResponseModel<Asset[]>> {
        try {
            logger.info("AssetRepo.getAll: getting all assets");
            const query = `Select * FROM assets where hidden = false`;
            const result = (await this.dbClient.query(query)).rows;
            return {
                success: true,
                payload: result,
            };
        } catch (error) {
            logger.error(
                "AssetRepo.getAll: Error occured while getting asset: ",
                error
            );

            return {
                success: false,
                payload: null,
                error: error,
            };
        }
    }

    public async delete(ID: string): Promise<DbResponseModel<any>> {
        try {
            logger.info("AssetRepo.delete: delete asset");
            
            const query = `UPDATE assets SET  hidden = true WHERE  id = $1`;
            await this.dbClient.query(query);
            return {
                success: true,
                payload: null,
            };
        } catch (error) {
            logger.error(
                "AssetRepo.delete: Error occured while deleting asset: ",
                error
            );

            return {
                success: false,
                payload: null,
                error: error,
            };
        }
    }
}
