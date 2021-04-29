import { DatabaseConnection } from '../database'
import { IUser } from '../interface/UserInterface'

export class UserModel extends DatabaseConnection {

    public async GetLimitFour() : Promise<any> {
        try {
            const conn = await this.Connection;
            const user = await conn.query('call getLimitFourUser()');
            return user[0];
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async GetById(id: number) : Promise<any> {
        try {
            const conn = await this.Connection;
            const user =  await conn.query('call getUserById(?)', [id]);
        
            return user[0];
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async Create(profileImage: string, firstname: string, lastname: string, country: string, email: string, password: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            return await conn.query('call insertUser(?, ?, ?, ?, ?, ?)', [profileImage, firstname, lastname, country, email, password]);
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async Update(id: number, profileImage: string, firstname: string, lastname: string, email: string, password: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            return await conn.query('call updateUser(?, ?, ?, ?, ?, ?)', [id, profileImage, firstname, lastname, email, password]);    
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async Delete(id: number) : Promise<any> {
        try {
            const conn = await this.Connection;    
            return await conn.query('call deleteAccount(?)', [id]);
        } 
        
        catch (error) {
            console.log(error);
        }
    }
}