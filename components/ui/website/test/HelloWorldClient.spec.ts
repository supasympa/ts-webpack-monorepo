import {expect} from '@foo/test-support';
import * as nock from 'nock';
import { HelloWorldClient } from '../src/HelloWorldClient';

const stubCustomer = {
  firstName: 'Test',
  email: 'email@foo.com',
  lastName: 'User',
};
describe(`A HelloWorldClient`, () => {
    describe(`invoking .hello()`, () => {
        let client: HelloWorldClient;

        beforeEach(() => {
            const baseURL = 'http://fake.domain';
            nock(baseURL)
                .post('/hello', stubCustomer)
                .reply(200, {
                   reply: 'Hello Test User!',
                });

            client = new HelloWorldClient({baseURL});
        });

        it(`should make a call to the correct url`, async () => {
            return client.hello(stubCustomer)
                .then((res: any) => expect(res.status).to.equal(200));
        });

        it(`should respond with a json payload on a successful response`, () => {
            return client.hello(stubCustomer)
                .then((res: any) => expect(res.data).to.deep.equal({
                    reply: 'Hello Test User!',
                }));
        });
    });
});
