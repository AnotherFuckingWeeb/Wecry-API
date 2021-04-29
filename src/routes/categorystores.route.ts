import { IRoute, Router } from 'express';
import { CategoryStoresController } from '../controllers/CategoryStoresController';

export class CategoryStoresRoute {
    public router: Router = Router();
    private controller: CategoryStoresController = new CategoryStoresController();

    constructor() {
        this.CategoryStoresRoute();
    }

    private CategoryStoresRoute() : IRoute {
        return this.router.route('/category=:category').get(this.controller.GetStoresByCategory);
    }

}