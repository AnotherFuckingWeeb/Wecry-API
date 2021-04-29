import { DatabaseConnection } from '../database';

export class ShoppingCartModel extends DatabaseConnection {
    
    public async getShoppingCartByUserId(userId: number) : Promise<any> {
        try {
            const conn = await this.Connection;
            const shoppingCart = await conn.query('call getShoppingCartByUserId(?)', [userId]);

            return shoppingCart[0];

        } 
        catch (error) {
            console.log(error);    
        }
    }

    public async Add(userId: number, postId: number) : Promise<any> {
        try {
            const conn = await this.Connection;
            return await conn.query('call insertShoppingCart(?, ?)', [userId, postId]);
        } 
        catch (error) {
            console.log(error);    
        }
    }

    public async Delete(postId: number) : Promise<any> {
        const conn = await this.Connection;
        return conn.query('call deleteShoppingCartByPostId(?)', [postId]);
    }

    public async IsPostInShoppingCart(postId: number, userId: number) : Promise<any> {
        const conn = await this.Connection;
        const post = await conn.query('call getShoppingCartByPostIdAndUserId(?, ?)', [postId, userId]);

        return post[0];

    }
}