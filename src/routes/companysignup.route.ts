import { Router, IRoute } from 'express';
import { CompanySignUpController } from '../controllers/CompanySignUpController'

export class CompanySignUpRoute {
    public router : Router = Router();
    private controller : CompanySignUpController = new CompanySignUpController();

    constructor() {
        this.CompanySignUpRoute();
    }

    private CompanySignUpRoute() : IRoute {
        return this.router.route('/').post(this.controller.SignUp);
    }
}