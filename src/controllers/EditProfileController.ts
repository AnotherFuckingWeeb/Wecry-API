import { Request, Response } from 'express'
import { IUser } from '../interface/UserInterface'
import { upload } from '../multer.config'
import { UserModel } from '../models/UserModel'
import fs from 'fs'

export class EditProfileController {

    public async EditUser(req: Request, res: Response) : Promise<Response> {
        try {
            const model: UserModel = new UserModel();
            const id = parseInt(req.params.id);
            const requestedUser = await model.GetById(id);
            const path = `public/uploads/${requestedUser[0][0].profile_image}`;
            const editProfile = upload.single('edit-profile');
            
            editProfile(req, res, async (err: any) => {

                const user: IUser = req.body;
                const file = req.file;

                console.log(req.file);

                if (req.file) {
                    try {
                        fs.stat(path, (err) => {
                            if (err) {
                                console.log(err);
                            }

                            else {
                                fs.unlink(path, async () => {
                                    user.profileImage = file.filename;
                                    await model.Update(id, user.profileImage, user.firstname, user.lastname, user.email, user.password);
                                });
                            }
                        })
                    } 
                    
                    catch (error) {
                        console.log(error);
                        return res.json({ msg: error });
                    }
                }

                else {
                    try {                        
                        await model.Update(id, user.profileImage, user.firstname, user.lastname, user.email, user.password);
                    } 
                    
                    catch (error) {
                        console.log(err);
                        return res.json({ msg: error });
                    }
                }
            });

            console.log(req.file)

            return res.json({ msg: 'User Has Been Updated' });
        } 
        
        catch (error) {
            console.log(error)
            return res.json({ msg: error });
        }
    }
}