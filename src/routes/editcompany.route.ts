import { IRoute, Router } from 'express';
import { EditCompanyProfileController } from '../controllers/EditCompanyProfileController';

export class EditCompanyProfileRoute {
    public router: Router = Router();
    private controller: EditCompanyProfileController = new EditCompanyProfileController();
    
    constructor() {
        this.EditCompanyProfileRoute();
    }

    private EditCompanyProfileRoute() : IRoute {
        return this.router.route('/:id').put(this.controller.EditCompanyProfileController);
    }

}