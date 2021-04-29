import { IRoute, Router } from 'express';
import { FeedbackController } from '../controllers/FeedbackController';

export class FeedbackRoute {
    public router: Router = Router();
    private controller: FeedbackController = new FeedbackController();

    constructor() {
        this.postFeedbackRoute();
    }

    private postFeedbackRoute() : IRoute {
        return this.router.route('/').post(this.controller.PostFeedback);
    } 

}