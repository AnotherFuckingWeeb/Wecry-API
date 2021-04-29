import { Request, Response } from 'express'
import { PostModel } from '../models/PostModel'
import { IPost } from '../interface/PostInterface'
import { IPostImage } from '../interface/PostImageInterface'
import { upload } from '../multer.config'
import { PostImageModel } from '../models/PostImageModel'

export class CreatePostController {

    public async CreatePost(req: Request, res: Response) : Promise<Response> {
        try {
            const postImage = upload.fields([
                {
                    name: 'post-image',
                    maxCount: 1,
                },
                {
                    name: 'post-images',
                    maxCount: 5
                }
            ]);

            postImage(req, res, async (err: any) => {
                try {
                    if (err) {
                        console.log(err)
                        return res.json({ msg: err });
                    }

                    else {
                        const postModel: PostModel = new PostModel();
                        const postImageModel: PostImageModel = new PostImageModel();
                        
                        const post: IPost = req.body;
                        const files = req.files as { [fieldname: string] : Express.Multer.File[] };
                        
                        post.image = files["post-image"][0].filename;
                        post.userId = parseInt(req.body.user_id);

                        const newPost = await postModel.Create(post.userId, post.image,post.title, post.price, post.category, post.description);

                        for (let i = 0; i < files["post-images"].length; i++) {
                            const postImage: IPostImage = { postId: newPost[0][0].id, name: files["post-images"][i].filename };
                            
                            await postImageModel.Create(postImage.postId, postImage.name);
                        }
                    
                    }
                } 
                
                catch (error) {
                    console.log(error);
                    return res.json({ msg: error });
                }
            })

            return res.json({ msg: 'Post Created Sucessfully' });
        } 
        
        catch (error) {
            console.log(error);
            return res.json({ msg: error });
        }
    }

}