import { DatabaseConnection } from '../database';

export class FeedbackModel extends DatabaseConnection {

    public async GetFeedbackByUsers() : Promise<any> {
        try {
            const conn = await this.Connection;
            const user = await conn.query('call getLimitFourUserFeedBack()');
            return user[0];
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async GetFeedbackByCompanies() : Promise<any> {
        try {
            const conn = await this.Connection;
            const companies = await conn.query('call getLimitFourCompanyFeedback()');
            return companies[0];
        } 
        
        catch (error) {
            console.log(error);
        }
    }


    public async Create(userId: number, comment: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            return await conn.query('call insertFeedback(?, ?)', [userId, comment]);    
        } 
        
        catch (error) {
            console.log(error);
        }
    }

}