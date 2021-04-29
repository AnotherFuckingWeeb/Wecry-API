import { DatabaseConnection } from '../database';
import { IPost } from '../interface/PostInterface'

export class PostModel extends DatabaseConnection {

    public async GetById(id: number) : Promise<any> {
        try {
            const conn = await this.Connection;
            const post = await conn.query('call getPostById(?)', [id]);
            
            return post[0];
        }
         
        catch (error) {
            console.log(error)    
        }
    }

    public async GetByUserId(userId: number) : Promise<any> {
        try {
            const conn = await this.Connection;
            const posts = await conn.query('call getPostsByUserId(?)', [userId]);

            return posts[0];
        }

        catch(error) {
            console.log(error);
        }
    }

    public async GetByTitle(title: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            const posts = await conn.query('call getPostsByTitle(?)', [title]);
            return posts[0];
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async GetByCategory(category: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            const posts = await conn.query('call getPostsByCategory(?)', [category]);
            return posts[0];
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async Create(userId: number, image: string, title: string, price: string, category: string, description: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            const newPost = await conn.query('call insertPost(?, ?, ?, ?, ?, ?)', [userId, image, title, price, category, description]);
            return newPost[0]
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async Delete(id: number) {
        try {
            const conn = await this.Connection;
            return await conn.query('call deletePost(?)', [id]);
        } 
        
        catch (error) {
            console.log(error);
        }
    }
}