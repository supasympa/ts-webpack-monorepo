import {applyHelloWorldRouteHandlersTo} from '@foo/hello-world-service';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as https from 'https';
import * as fs from 'fs';

const app = express();
const PORT = 4000;
app.use(bodyParser.json());
app.use(express.static('../ui/website'));
applyHelloWorldRouteHandlersTo(app);

const opts = {
    key: fs.readFileSync('../../server.key'),
    cert: fs.readFileSync('../../server.crt'),
    requestCert: false,
    rejectUnauthorized: false,
};
const httpsServer = https.createServer(opts, app);

httpsServer.listen(443, () => console.log('listening on 443')); //tslint:disable-line
