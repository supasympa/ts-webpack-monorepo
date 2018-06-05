import {Customer, Person} from '@foo/domain';
import * as Express from 'express';
import {HelloWorldService} from '../HelloWorldService';

export interface HelloWorldServiceResponse {
    reply: string;
}

export function applyHelloWorldRouteHandlersTo(app: Express.Application): void {
    app.post('/hello', (req: Express.Request, res: Express.Response) => {
        const hws = new HelloWorldService();
        const person = req.body as Person;
        res.status(200).send({
            reply: hws.hello(Customer.from(person)),
        } as HelloWorldServiceResponse);
    });
}
