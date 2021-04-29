import { Router, IRoute } from 'express';
import { LoginController } from '../controllers/LoginController'

export class LoginRoute {
    public router : Router = Router();
    private controller: LoginController = new LoginController();

    constructor() {
        this.LoginRoute();
    }

    private LoginRoute() : IRoute {
        return this.router.route('/').post(this.controller.Login);
    }

}