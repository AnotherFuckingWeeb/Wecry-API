import { DatabaseConnection } from '../database';

/**
 * The User and Company comes from the same table so the reason why this class exists 
 * is for take the values from User and Company when is logged In 
*/

export class AccountModel extends DatabaseConnection {

    public async GetAccount(email: string, password: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            const account = await conn.query('call getAccountByEmailAndPassword(?, ?)', [email, password]);

            return account[0];
        }
        
        catch (error) {
            console.log(error);   
        }
    }

    public async GetAccountByEmail(email: string) : Promise<any> {
        const conn = await this.Connection;
        const account = await conn.query('call getAccountByEmail(?)', [email]);

        return account[0];
    }

    public async DeleteAccount(id: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            return await conn.query('call deleteAccount(?)', [id]);
        }

        catch (error) {
            console.log(error)
        }
    }

}