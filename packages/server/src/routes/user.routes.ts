import { Router } from 'express';
import passport from 'passport';

import { updateUser } from '../controllers/user.controller';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.put('/:id', passport.authenticate("jwt", { session: false }), updateUser);
    }
}
const router = new UserRoutes().router;

export default router;