import "reflect-metadata";
import Boom from "@hapi/boom";
import { StatusCodes } from "http-status-codes";
import { Asset } from "src/common/models/asset";
import { ResponseModel } from "src/common/models";
import { Service, Inject } from "typedi";

import { AssetRepo } from "../../common/repositories";
import { logger } from "../../utils";

@Service()
export class AssetService {
    @Inject()
    private readonly repo: AssetRepo;

    public async createAsset(requestBody: Asset): Promise<ResponseModel<Asset>> {
        try {
            const result = await this.repo.create(requestBody);

            const response: ResponseModel<Asset> = {
                hasError: false,
                message: "Success",
                payload: result.payload,
                statusCode: StatusCodes.OK,
            };

            return response;
        } catch (err) {
            logger.error(
                `AssetService.createAsset: Error occured: ${err}`
            );
            throw Boom.internal();
        }
    }

    public async getAsset(ID: string): Promise<ResponseModel<Asset>> {
        try {
            let response: ResponseModel<Asset>;
            const result = await this.repo.getByID(ID); 
            if (result.payload == null) {
                response = {
                    hasError: false,
                    message: "Error",
                    payload: null,
                    statusCode: StatusCodes.NOT_FOUND,
                };
            } else {
                response = {
                    hasError: false,
                    message: "Success",
                    payload: result.payload,
                    statusCode: StatusCodes.OK,
                };
                return response;

            }

        } catch (err) {
            logger.error(
                `AssetService.getAsset: Error occured: ${err}`
            );
            throw Boom.internal();
        }
    }

    public async getAllAssets(): Promise<ResponseModel<Asset[]>> {
        try {
            const result = await this.repo.getAll();

            const response: ResponseModel<Asset[]> = {
                hasError: false,
                message: "Success",
                payload: result.payload,
                statusCode: StatusCodes.OK,
            };

            return response;
        } catch (err) {
            logger.error(
                `AssetService.getAllAssets: Error occured: ${err}`
            );
            throw Boom.internal();
        }
    }

    public async delete(ID: string): Promise<ResponseModel<Asset>> {
        try {
            let response: ResponseModel<Asset>;
            const result = await this.repo.delete(ID); 
            if (result.success) {
                response = {
                    hasError: false,
                    message: "Error",
                    payload: null,
                    statusCode: StatusCodes.NOT_FOUND,
                };
            } else {
                response = {
                    hasError: false,
                    message: "Success",
                    payload: null,
                    statusCode: StatusCodes.OK,
                };
                return response;

            }

        } catch (err) {
            logger.error(
                `AssetService.getAsset: Error occured: ${err}`
            );
            throw Boom.internal();
        }
    }
}
