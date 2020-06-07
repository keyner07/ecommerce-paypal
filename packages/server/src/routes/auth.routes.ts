import { Router } from 'express';

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.post('/register', (req, res) => { res.json({ message: "Hey" })});
    }
}
const router = new UserRoutes().router;

export default router;