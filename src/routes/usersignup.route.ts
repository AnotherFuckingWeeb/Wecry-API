import { Router, IRoute } from 'express'
import { UserSignUpController } from '../controllers/UserSignUpController'
import { upload } from '../multer.config'

export class UserSignUpRoute {
    
    public router : Router = Router();
    private controller : UserSignUpController = new UserSignUpController();
    
    constructor() {
        this.SignUpRoute();
    }

    private SignUpRoute() : IRoute {
        return this.router.route('/').post(this.controller.SignUp);
    }
}