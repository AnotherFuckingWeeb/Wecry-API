import { Router, IRoute  } from 'express'
import { PostsController } from '../controllers/PostsController'

export class PostsRoute {
    public router : Router = Router();
    private controller: PostsController = new PostsController();

    constructor() {
        this.GetPostsByTitle();
        this.GetPostsByCategory();
    }

    private GetPostsByTitle() : IRoute {
        return this.router.route('/title=:title/:uid?').get(this.controller.GetPostsByTitle);
    }

    private GetPostsByCategory() : IRoute {
        return this.router.route('/category=:category/:uid?').get(this.controller.getPostsByCategory)
    }
}