import { IRoute, Router } from 'express';
import { PaymentController } from '../controllers/PaymentController';

export class PaymentRoute {
    public router: Router = Router();
    private controller: PaymentController = new PaymentController();

    constructor() {
        this.CheckoutRoute();
    }

    private CheckoutRoute() : IRoute {
        return this.router.route('/checkout').post(this.controller.Checkout);
    }
}