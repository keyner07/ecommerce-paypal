import { Router } from 'express';
import passport from 'passport';

import { createProduct, updateProduct, deleteProduct, getProduct, searchProduct } from '../controllers/product.controller';

class ProductRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    protected routes(): void {
        this.router.get('/', passport.authenticate("jwt", { session: false }), searchProduct);
        this.router.get('/:id', passport.authenticate('jwt', { session: false }), getProduct);
        this.router.put('/:id', passport.authenticate('jwt', { session: false }), updateProduct);
        this.router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteProduct);
        this.router.post('/:id/pay', passport.authenticate('jwt', { session: false }), createProduct);
    }
}
const router = new ProductRoutes().router;

export default router;