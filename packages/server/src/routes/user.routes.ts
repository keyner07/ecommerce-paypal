import { Router } from 'express';
import passport from 'passport';

import { signIn, signUp, updateUser } from '../controllers/user.controller';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.post('/register', signUp);
        this.router.post('/login', signIn);
        this.router.put('/:id', passport.authenticate("jwt", { session: false }), updateUser);
    }
}
const router = new UserRoutes().router;

export default router;
