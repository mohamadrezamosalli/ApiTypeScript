import bodyParser from 'body-parser';
import { createServer } from 'http';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

export default class Core {
    // define properties
    app: any;

    // give value to properties
    constructor() {
        this.app = express();
    }

    // run all methods
    async start() {
        await this.setupExpress();
        await this.configuration();
        await this.setupRoutes();
    }

    // setup express server
    setupExpress() {
        let server = createServer(this.app);
        server.listen(process.env.PORT || 3000, () => (console.log('server started...')));
    }

    configuration() {
        // set static file url
        this.app.use('/static', express.static(path.resolve('./', 'public')));

        // body parser
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // morgan
        if(this.app.get('env'))
            this.app.use(morgan('dev'));
    }

    setupRoutes() {
        this.app.get('/', (req: Request, res: any, next: any) => {
            console.log('ok');
            res.end();
        });
    }

};