import { Request, Response } from 'express';
import  fs from 'fs'
import { IComment } from '../interface/CommentInterface';
import { PostModel } from '../models/PostModel';
import { PostImageModel } from '../models/PostImageModel'
import { UserModel } from '../models/UserModel'
import { CommentModel } from '../models/CommentModel';
import { ShoppingCartModel } from '../models/ShoppingCartModel'

export class PostController {
    public async GetPost(req: Request, res: Response) : Promise<Response> {
        try {
            const postId = parseInt(req.params.id);
            const userId = parseInt(req.params.uid)
            const postModel: PostModel = new PostModel();
            const postImageModel: PostImageModel = new PostImageModel();
            const userModel: UserModel = new UserModel();
            const commentModel: CommentModel = new CommentModel();
            const shoppingCartModel: ShoppingCartModel = new ShoppingCartModel();
            let isFavorite = false;

            const post = await postModel.GetById(postId);
            const postImages = await postImageModel.getPostImages(postId);
            const comments = await commentModel.GetCommentsByPostId(postId);
            const postOwner = await userModel.GetById(post[0][0].user_id);

            if (!isNaN(userId)) {
                const favoritePost = await shoppingCartModel.IsPostInShoppingCart(postId, userId);

                if (favoritePost[0][0] !== undefined) {
                    if (postId === favoritePost[0][0].post_id) {
                        isFavorite = true;
                    }
                }
            }

            return res.json({
                post: post[0][0],
                post_owner: postOwner[0][0],
                post_images: postImages[0],
                comments: comments[0],
                isFavorite
            });
        } 
        
        catch (error) {
            return res.json({ msg: error.message });
        }
    }

    public async GetComments(req: Request, res: Response) : Promise<Response> {
        try {
            const model: CommentModel = new CommentModel();
            const postId = parseInt(req.params.id);
            
            const comments = await model.GetCommentsByPostId(postId);

            return res.json({
                comments: comments[0]
            });
        } 
        
        catch (error) {
            console.log(error);
            return res;
        }
    }

    public async PostComment(req: Request, res: Response) : Promise<Response> {
        try {

            const model: CommentModel = new CommentModel();
            const comment: IComment = req.body;
            
            await model.Create(comment.postId, comment.userId, comment.content, comment.date);

            return res.json({ msg: 'Comment Has Been Created' });
        } 
        
        catch (error) {
            console.log(error);
            return res.json({ msg: error });
        }
    }

    public async DeletePost(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const postModel: PostModel = new PostModel();    
            const postImageModel: PostImageModel = new PostImageModel();
            
            const post = await postModel.GetById(id);
            const images = await postImageModel.getPostImages(post[0][0].id);
        
            fs.unlink(`public/uploads/${post[0][0].image}`, async (err) => {

                if (err) console.log('post error: ', err)

                for (let i = 0; i < images[0].length; i++ ) {
                    fs.unlink(`public/uploads/${images[0][i].name}`, (err) => {
                        if (err) console.log('post images error: ', err)
                    })
                }

                await postModel.Delete(id);

                return res.json({ msg: 'Post Deleted' });
            })
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async UpdateComment(req: Request, res: Response) : Promise<Response> {
        try {
            const model: CommentModel = new CommentModel();
            const id = parseInt(req.params.id);
            const comment: IComment = req.body;
            
            await model.Update(id, comment.userId, comment.content);

            return res.json({ msg: 'Comment has been updated' });
        } 
        
        catch (error) {
            console.log(error);
            return res.json({ msg: error });
        }
    }

    public async DeleteComment(req: Request, res: Response) : Promise<Response> {
        try {
            const model: CommentModel = new CommentModel();
            const id = parseInt(req.params.id);
            const { userId } : IComment = req.body
            
            await model.Delete(id, userId);

            return res.json({ msg: 'Comment has been deleted' });
        } 
        
        catch (error) {
            console.log(error);
            return res.json({ msg: error });
        }
    }
}