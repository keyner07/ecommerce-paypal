import { Router } from 'express';
import passport from 'passport';

import {
    createOrder,
    getOrder,
    getOrders,
    deleteOrder,
    paymentMethod,
} from '../controllers/order.controller';

class OrderRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.get('/', passport.authenticate('jwt', { session: false }), getOrders);
        this.router.get('/:id', passport.authenticate('jwt', { session: false }), getOrder);
        this.router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteOrder);
        this.router.post('/', passport.authenticate('jwt', { session: false }), createOrder);
        this.router.put(
            '/:id/pay',
            passport.authenticate('jwt', { session: false }),
            paymentMethod,
        );
    }
}
const router = new OrderRoutes().router;

export default router;
