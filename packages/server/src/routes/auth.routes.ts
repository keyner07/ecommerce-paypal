import { Router } from 'express';

import { signIn, signUp } from '../controllers/user.controller';
import userRouter from './user.routes';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.post('/register', signUp);
        this.router.post('/login', signIn);
        this.router.use('/user', userRouter);
    }
}
const router = new UserRoutes().router;

export default router;
