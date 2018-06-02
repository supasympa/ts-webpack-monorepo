import axios, {AxiosInstance} from 'axios';

export class HelloWorldClient {
    private http: AxiosInstance;

    constructor(opts: any) {
        this.http = axios.create(opts);
    }

    public hello(): Promise<any> {
        return this.http.get('/hello');
    }

}
