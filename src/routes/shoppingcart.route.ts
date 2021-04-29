import { IRoute, Router } from 'express';
import { ShoppingCartController } from '../controllers/ShoppingCartController';

export class ShoppingCartRoute {
    public router: Router = Router();
    private controller: ShoppingCartController = new ShoppingCartController();

    constructor() {
        this.GetShoppingCartRoute();
        this.AddShoppingCartRoute();
        this.DeleteShoppingCartRoute();
    }

    private GetShoppingCartRoute() : IRoute {
        return this.router.route('/:uid').get(this.controller.GetShoppingCart);
    }

    private AddShoppingCartRoute() : IRoute {
        return this.router.route('/add').post(this.controller.AddShoppingCart);
    }
    
    private DeleteShoppingCartRoute() : IRoute {
        return this.router.route('/:id/remove').delete(this.controller.DeleteShoppingCart);
    }
}