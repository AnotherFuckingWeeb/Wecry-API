import { Router, IRoute  } from 'express'
import { HomeController } from '../controllers/HomeController'

export class HomeRoute {
    public router: Router = Router();
    private controller: HomeController = new HomeController();

    constructor() {
        this.HomeRoute();
    }

    private HomeRoute() : IRoute {
        return this.router.route('/').get(this.controller.GetFeedback)
    }

}