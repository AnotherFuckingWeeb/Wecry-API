import { DatabaseConnection } from '../database'

export class CommentModel extends DatabaseConnection {

    public async GetCommentsByPostId(id: number) : Promise<any> {
        try {
            const conn = await this.Connection;
            const comments = await conn.query('call getCommentsByPostId(?)', [id]);
            
            return comments[0];
        } 
        
        catch (error) {
            console.log(error);    
        }
    }

    public async Create(postId: number, userId: number, content: string, date: string) : Promise<any> {
        try {
            const conn = await this.Connection;
        
            return await conn.query('call insertComment(?, ?, ?, ?)', [postId, userId, content, date]);
        
        } 
        
        catch (error) {
            console.log(error);            
        }
    }

    public async Update(id: number, userId: number, content: string) : Promise<any> {
        try {
            const conn = await this.Connection;

            return await conn.query('call updateComment(?, ?, ?)', [id, userId, content]);    
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async Delete(id: number, userId: number) : Promise<any> {
        try {
            const conn = await this.Connection;

            return await conn.query('call deleteComment(?, ?)', [id, userId]);
        } 
        
        catch (error) {
            console.log(error);    
        }
    }
}