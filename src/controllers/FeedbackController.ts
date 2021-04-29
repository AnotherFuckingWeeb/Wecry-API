import { Request, Response } from 'express';
import { FeedbackModel } from '../models/FeedbackModel'
import { IFeedback } from '../interface/FeedbackInterface'

export class FeedbackController {

    public async PostFeedback(req: Request, res: Response) : Promise<Response> {
        try {
            const model : FeedbackModel = new FeedbackModel();
            const feedback : IFeedback = req.body;

            await model.Create(feedback.userId, feedback.comment);

            return res.json({ msg: 'Feedback created successfully' });
        } 
        
        catch (error) {
            console.log(error);
            return res.json({ msg: error });
        }
    }

}