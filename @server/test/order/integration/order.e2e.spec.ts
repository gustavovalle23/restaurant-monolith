import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest'


describe('Order (e2e) Tests', () => {
    let app: INestApplication;


    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    })

    afterAll(async () => {
        await app.close()
    })

    const gql = '/graphql'

    describe('Create Order', () => {
        it('Should create an order when correct params', () => {
            request(app.getHttpServer())
                .post(gql)
                .send({})
        })
    })
})
