import { Router, IRoute } from 'express';
import { CompanyProfileController } from '../controllers/CompanyProfileController';

export class CompanyProfileRoute {
    public router: Router = Router();
    private controller: CompanyProfileController = new CompanyProfileController();

    constructor() {
        this.CompanyProfileRoute();
        this.DeleteCompanyProfileRoute();
    }

    private CompanyProfileRoute() : IRoute {
        return this.router.route('/:cid').get(this.controller.GetCompanyInfo);
    }

    private DeleteCompanyProfileRoute() : IRoute {
        return this.router.route('/:cid').delete(this.controller.DeleteCompany)
    }
}