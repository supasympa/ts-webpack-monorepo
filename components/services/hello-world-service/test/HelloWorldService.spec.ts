import {Customer} from '@foo/domain';
import {expect} from '@foo/test-support';
import {HelloWorldService} from '../src/HelloWorldService';

const customerStub = {
    fullName() {
        return 'Test User';
    },
};

describe('A HelloWorld Service', () => {
    describe('hello()', () => {
        it('should respond with a string', () => {
            const hws = new HelloWorldService();

            expect(hws.hello(customerStub as Customer)).to.equal('Hello Test User!');
        });
    });
});
