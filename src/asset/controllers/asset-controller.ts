import "reflect-metadata";
import { celebrate, Joi } from "celebrate";
import { Response, Request } from "express";
import { JsonController, Req, Res, Post, UseBefore, Get, Delete } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { ResponseModel } from "src/common/models";
import { Asset } from "src/common/models/asset";
import { Inject, Service } from "typedi";

import { logger } from "../../utils";
import Models from '../models/validation-model';
import { AssetService } from "../services/asset";


@JsonController("/assets")
@Service()
export class AssetController {
    @Inject()
    private readonly service: AssetService;


    @Post("/create")
    @UseBefore(celebrate(Models.createAssetValidationModel))
    @OpenAPI({
        description:
            "Create Assets",
        responses: {
            "400": { description: "Bad request, or validation errors", },
            "200": { description: "Success Response", },
        },
    })
    
    public async createAsset(
        @Req() req: Request,
        @Res() res: Response
    ): Promise<Response<ResponseModel<Asset>>> {
        try {
            const result = await this.service.createAsset(req.body);
            return res.status(result.statusCode).send(result);
        }
        catch (err) {
            logger.error("Error occured on asset controller", err)
        }
    }

    @Get("/get/single")
    @UseBefore(celebrate(Models.getAssetValidationModel))
    @OpenAPI({
        description:
            "Get Assets By id",
        requestBody: {
            content: {
                'application/json': {
                    schema: Models.getAssetRequestBodySchema,
                },
            },
        },
        responses: {
            "400": { description: "Bad request, or validation errors", },
            "200": { description: "Success Response", },
        },
    })
    public async getAsset(
        @Req() req: Request,
        @Res() res: Response
    ): Promise<Response<ResponseModel<Asset>>> {

        const result = await this.service.getAsset(String(req.query.id));
        return res.status(result.statusCode).send(result);
    }

    @Get("/get/all")
    @OpenAPI({
        description:
            "Get All Assets",
        requestBody: {
            content: {
                'application/json': {
                    schema: Models.getAssetRequestBodySchema,
                },
            },
        },
        responses: {
            "400": { description: "Bad request, or validation errors", },
            "200": { description: "Success Response", },
        },
    })
    public async getAllAsset(
        @Res() res: Response
    ): Promise<Response<ResponseModel<Asset>>> {

        const result = await this.service.getAllAssets();
        return res.status(result.statusCode).send(result);
    }

    @Delete("/delete")
    @OpenAPI({
        description:
            "Delete Asset",
        requestBody: {
            content: {
                'application/json': {
                    schema: Models.getAssetRequestBodySchema,
                },
            },
        },
        responses: {
            "400": { description: "Bad request, or validation errors", },
            "200": { description: "Success Response", },
        },
    })
    public async delete(
        @Req() req: Request,
        @Res() res: Response
    ): Promise<Response<ResponseModel<Asset>>> {

        const result = await this.service.delete(String(req.query.id));
        return res.status(result.statusCode).send(result);
    }
}
