import {Customer} from '@foo/domain';

export class HelloWorldService {
    public hello(customer: Customer): string {
        return `Hello ${customer.fullName()}!`;
    }
}
