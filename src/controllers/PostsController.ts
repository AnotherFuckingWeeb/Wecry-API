import { Request, Response } from 'express';
import { PostModel } from '../models/PostModel';
import { ShoppingCartModel } from '../models/ShoppingCartModel'

export class PostsController {
    
    public async GetPostsByTitle(req: Request, res: Response) : Promise<any> {
        try {
            const postModel: PostModel = new PostModel();
            const shoppingCartModel: ShoppingCartModel = new ShoppingCartModel();
            const title = req.params.title;
            const userId = parseInt(req.params.uid);
            const posts = await postModel.GetByTitle(title);
            const favorites = [];

            if (!isNaN(userId)) {
                for (let i = 0; i < posts[0].length; i++) {
                    const favoritePosts = await shoppingCartModel.IsPostInShoppingCart(posts[0][i].id, userId);
                    favorites.push(favoritePosts[0][0]);                   
                }
            }

            return res.json({
                posts: posts[0],
                favorites
            });
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async getPostsByCategory(req: Request, res: Response) : Promise<Response> {
        try {
            const postModel: PostModel = new PostModel();
            const shoppingCartModel: ShoppingCartModel = new ShoppingCartModel();
            const category = req.params.category;
            const userId = parseInt(req.params.uid);
            const posts = await postModel.GetByCategory(category);
            const favorites = [];

            if (userId) {
                for (let i = 0; i < posts[0].length; i++) {
                    console.log(posts[0][i].id)
                    const favoritePosts = await shoppingCartModel.IsPostInShoppingCart(posts[0][i].id, userId);
                    favorites.push(favoritePosts[0][0])
                }
            }

            return res.json({
                posts: posts[0],
                favorites
            });
        } 
        
        catch (error) {
            return res.json({ msg: error });
        }
    }

}