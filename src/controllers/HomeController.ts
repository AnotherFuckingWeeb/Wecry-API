import { Request, Response } from 'express';
import { FeedbackModel } from '../models/FeedbackModel'

export class HomeController {

    public async GetFeedback(req: Request, res: Response) : Promise<Response> {
        try {
            const model: FeedbackModel = new FeedbackModel();
            const usersFeedback = await model.GetFeedbackByUsers();
            const companiesFeedback = await model.GetFeedbackByCompanies();

            return res.json({
                feedback: {
                    users: usersFeedback[0],
                    companies: companiesFeedback[0]
                }
            });
        } 
        
        catch (error) {
            return res.json(error);
        }
    }

}