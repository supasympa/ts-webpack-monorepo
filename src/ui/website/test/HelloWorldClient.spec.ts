import {expect} from '@foo/test-support/index';
import * as nock from 'nock';
import { HelloWorldClient } from '../src/HelloWorldClient';

describe(`A HelloWorldClient`, () => {
    describe(`invoking .hello()`, () => {
        let client: HelloWorldClient;

        beforeEach(() => {
            const baseURL = 'http://fake.domain';
            nock(baseURL)
                .get('/hello')
                .reply(200, {
                   reply: 'Hello World!',
                });

            client = new HelloWorldClient({baseURL});
        });

        it(`should make a call to the correct url`, async () => {
            return client.hello()
                .then((res: any) => expect(res.status).to.equal(200));
        });

        it(`should respond with a json payload on a successful response`, () => {
            return client.hello()
                .then((res: any) => expect(res.data).to.deep.equal({
                    reply: 'Hello World!',
                }));
        });
    });
});
