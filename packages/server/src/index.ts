import Express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config/index';

class App {
    public app: Application;

    constructor() {
        this.app = Express();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(Express.urlencoded({ extended: false }));
        this.app.use(Express.json());
        this.app.use(helmet());
    }

    protected routes(): void {
        this.app.use('/', (req, res) => { res.json({ message: "Hello" })});
    }
}
const app = new App().app;
const { port } = config;
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})