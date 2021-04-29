import { Router, IRoute } from 'express';
import { EditProfileController } from '../controllers/EditProfileController'

export class EditProfileRoute {
    public router : Router = Router();
    private controller : EditProfileController = new EditProfileController();

    constructor() {
        this.EditProfileRoute();
    }

    private EditProfileRoute() : IRoute {
        return this.router.route('/:id/edit').put(this.controller.EditUser);
    }
}