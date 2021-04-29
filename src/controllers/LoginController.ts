import { Request, Response } from 'express';
import { AccountModel } from '../models/AccountModel'

export class LoginController {

    public async Login(req: Request, res: Response) : Promise<Response> {
        try {
            const model : AccountModel = new AccountModel();
            const { email, password } = req.body
            const account = await model.GetAccount(email, password);

            
            if (account[0].length > 0) {
                return res.json({
                    account: account[0][0]
                });
            }

            else {
                return res.json({
                    msg: "Couldn't find account"
                })
            }
        } 
        
        catch (error) {
            console.log(error);
            return res.json(error);
        }
    }

}