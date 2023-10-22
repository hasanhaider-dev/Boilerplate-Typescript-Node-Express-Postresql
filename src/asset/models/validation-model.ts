"use strict";
import { Joi } from "celebrate";

const createAssetValidationModel = {
    body: Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
    }),
};

const getAssetValidationModel = {
    query: Joi.object({
        id: Joi.string().guid().required()
    })
};

// schema for Swagger docs
const getAssetRequestBodySchema  = {
    content: {
        'application/json': {
            schema: {
                type: 'params',
                properties: {
                    id: {
                        type: 'uuid',
                        description: 'id of an asset',
                    }
                },
            },
        },
    },
};

const createAssetRequestBodySchema = {
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        description: 'Asset name',
                    },
                    type: {
                        type: 'string',
                        description: 'Asset type',
                    },
                },
            },
        },
    },
};
const Models = { createAssetValidationModel, createAssetRequestBodySchema, getAssetValidationModel , getAssetRequestBodySchema};
export default Models;
