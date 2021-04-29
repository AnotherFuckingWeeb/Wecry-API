import { Request, Response } from 'express';
import fs from 'fs'
import { PostModel } from '../models/PostModel';
import { UserModel } from '../models/UserModel';
import { ShoppingCartModel } from '../models/ShoppingCartModel'

export class ProfileController {
    public async GetProfileInfo(req: Request, res: Response) : Promise<Response> {
        try {
            const profileId = parseInt(req.params.pid)
            const userId = parseInt(req.params.uid);
            const postModel: PostModel = new PostModel();
            const userModel: UserModel = new UserModel();
            const shoppingCartModel: ShoppingCartModel = new ShoppingCartModel();
            const favorites = [];

            const posts = await postModel.GetByUserId(profileId);
            const user = await userModel.GetById(profileId);

            if (!isNaN(userId)) {
                for (let i = 0; i < posts[0].length; i++) {
                    const favoritePosts = await shoppingCartModel.IsPostInShoppingCart(posts[0][i].id, userId);
                    favorites.push(favoritePosts[0][0]);                   
                }
            }

            return res.json({
                user: user[0][0],
                posts: posts[0]
            });
        } 
        
        catch (error) {
            return res.json({ msg: error });
        }
    }

    public async DeleteUser(req: Request, res: Response) : Promise<any> {
        try {
            const id = parseInt(req.params.id);
            const model: UserModel = new UserModel();
            const requestedUser = await model.GetById(id);
            const path = `public/uploads/${requestedUser[0][0].profile_image}`;
            
            fs.unlink(path, async (err) => {
                if (err) {
                    console.log(err);
                }

                await model.Delete(id);
            })

            return res.json({ msg: 'Account Has Been Deleted' });
        } 
        
        catch (error) {
            console.log(error);
        }
    }
}