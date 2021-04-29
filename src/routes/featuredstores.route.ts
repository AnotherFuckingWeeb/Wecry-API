import {IRoute, Router} from 'express';
import { FeaturedStoresController } from '../controllers/FeaturedStoresController';

export class FeaturedStoresRoute {
    public router: Router = Router();
    private controller: FeaturedStoresController = new FeaturedStoresController();

    constructor() {
        this.FeaturedStoresRoute();
    }

    private FeaturedStoresRoute() : IRoute {
        return this.router.route('/category=:category').get(this.controller.GetStoresByCategory);
    }
}