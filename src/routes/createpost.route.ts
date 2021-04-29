import { Router, IRoute } from 'express'
import { CreatePostController } from '../controllers/CreatePostController';

export class CreatePostRoute {
    public router: Router = Router();
    private controller: CreatePostController = new CreatePostController();

    constructor() {
        this.CreatePostRoute();
    }

    private CreatePostRoute() : IRoute {
        return this.router.route('/').post(this.controller.CreatePost);
    }
}