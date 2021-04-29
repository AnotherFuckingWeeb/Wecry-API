import { DatabaseConnection } from '../database';
import { IPostImage } from '../interface/PostImageInterface';

export class PostImageModel extends DatabaseConnection {

    public async getPostImages(postId: number) : Promise<any> {
        const conn = await this.Connection;
        const images = await conn.query('call getPostImagesName(?)', [postId]);
        
        return images[0];
    }

    public async Create(postId: number, name: string) : Promise<any> {
        const conn = await this.Connection;
        
        return await conn.query('call insertPostImage(?, ?)', [postId, name]);
    }

}