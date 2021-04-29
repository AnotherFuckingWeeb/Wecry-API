import { Request, Response } from 'express'
import { IUser } from '../interface/UserInterface'
import { upload } from '../multer.config'
import { UserModel } from '../models/UserModel'
import { AccountModel } from '../models/AccountModel'

export class UserSignUpController {
    
    public async SignUp(req: Request, res: Response) : Promise<any> {
        const profilePic = upload.single('file');

        profilePic(req, res, async (err: any) => {
            try {
                const user: IUser = req.body;
                const accountModel: AccountModel = new AccountModel();
                const userModel: UserModel = new UserModel(); 
                const account = await accountModel.GetAccountByEmail(user.email);
                
                if (account[0].length > 0) {
                    return res.json({
                        msg: 'Email already in use',
                        error: true
                    });
                }

                else {
                    const file = req.file.filename;
                    user.profileImage = file;

                    await userModel.Create(user.profileImage, user.firstname, user.lastname, user.country, user.email, user.password);

                    return res.json({
                        msg: 'User has been created',
                        error: false
                    });
                }
                
            } 
            
            catch (error) {
                console.log(error);    
            }
        })
    }
}