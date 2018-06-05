import {Person} from '@foo/domain';
import axios, {AxiosInstance} from 'axios';

export class HelloWorldClient {
    private http: AxiosInstance;

    constructor(opts: any) {
        this.http = axios.create(opts);
    }

    public hello(person: Person): Promise<any> {
        return this.http.post('/hello', person);
    }
}
