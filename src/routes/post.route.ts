import { Router, IRoute } from 'express';
import { PostController } from '../controllers/PostController';

export class GetPostRoute {
    public router: Router = Router();
    private controller: PostController = new PostController();

    constructor() {
        this.GetPostRoute();
        this.PostCommentRoute();
        this.GetCommentsRoute();
        this.EditCommentRoute();
        this.DeleteCommentRoute();
        this.DeletePostRoute();
    }

    private GetPostRoute() : IRoute {
        return this.router.route('/postId=:id/:uid?').get(this.controller.GetPost);
    }

    private PostCommentRoute() : IRoute {
        return this.router.route('/comment').post(this.controller.PostComment);
    }

    private GetCommentsRoute() : IRoute {
        return this.router.route('/:id/comments').get(this.controller.GetComments);
    }

    private EditCommentRoute() : IRoute {
        return this.router.route('/comment/edit/:id').put(this.controller.UpdateComment);
    }

    private DeleteCommentRoute() : IRoute {
        return this.router.route('/comment/delete/:id').delete(this.controller.DeleteComment);
    }

    private DeletePostRoute() : IRoute {
        return this.router.route('/delete/:id').delete(this.controller.DeletePost);
    }
}