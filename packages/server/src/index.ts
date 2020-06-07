import Express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';

import config from './config/index';
import passportMiddleware from './middlewares/passport';
import authRouter from './routes/auth.routes';
import db from './db';

class App {
    public app: Application;

    constructor() {
        this.app = Express();
        this.plugins();
        this.routes();
        this.db();
    }

    protected plugins(): void {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(Express.urlencoded({ extended: false }));
        this.app.use(Express.json());
        this.app.use(passport.initialize());
        passport.use(passportMiddleware);
    }

    protected routes(): void {
        this.app.use('/api', authRouter);
    }
    protected db(): void {
        const database = config.database?.toString();
        db(database);
    }
}
const app = new App().app;
const { port } = config;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
