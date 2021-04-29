import { Router, IRoute } from 'express';
import { ProfileController } from '../controllers/ProfileController';

export class UserProfileRoute {
    public router: Router = Router();
    private controller: ProfileController = new ProfileController();

    constructor() {
        this.UserProfileRoute();
        this.DeleteProfileRoute();
    }

    private UserProfileRoute() : IRoute {
        return this.router.route('/profile_id=:pid/:uid?').get(this.controller.GetProfileInfo);
    }

    private DeleteProfileRoute() : IRoute {
        return this.router.route('/:id/delete').delete(this.controller.DeleteUser);
    }

}