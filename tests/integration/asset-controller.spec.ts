import 'jest'
import { Application } from 'express'
import request from 'supertest'
import { Container } from "typedi";

import { App } from '../../src/app';
import { Client } from 'pg';
import { DatabaseService } from 'src/common/services';
import exp from 'constants';

describe('Integration Test - Asset Controller', () => {
    let expressApp: Application;
    beforeAll(async () => {
        // Setup Test DB
        expressApp = Container.get(App).expressApplication;
    });

   

    it('/assets/create', async () => {
        const response = await request(expressApp)
            .post('/assets/create')
            .set('Accept', 'application/json')
            .send({
                name: "TestAsset",
                type: "Image"
            })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.message).toEqual('Success');
        expect(response.body.name).toEqual('TestAsset');
        expect(response.body.name).toEqual('Image');
    });

    it('/assets/get', async () => {
        const response = await request(expressApp)
            .get(`/assets/get?id=testID`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.message).toEqual('Success');
        expect(response.body.name).toEqual('TestAsset');
        expect(response.body.name).toEqual('Image');
    });
});
