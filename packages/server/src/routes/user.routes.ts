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
        this.router.put('/:id', passport.authenticate('jwt', { session: false }), updateUser);
        this.router.get(
            '/hey',
            passport.authenticate('jwt', { session: false }),
            async (req, res) => {
                return res.send('hey');
                console.log(req);
            },
        );
    }
}
const router = new UserRoutes().router;

export default router;
