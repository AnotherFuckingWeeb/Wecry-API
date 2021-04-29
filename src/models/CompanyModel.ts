import { DatabaseConnection } from '../database';
import { ICompany } from '../interface/CompanyInterface'

export class CompanyModel extends DatabaseConnection {

    public async GetLimitFour() : Promise<any> {
        try {
            const conn = await this.Connection;
            const companies = await conn.query('call getLimitFourCompany()');
            return companies[0];    
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async GetById(id: number) : Promise<any> {
        try {
            const conn = await this.Connection;
            const company = await conn.query('call getCompanyById(?)', id);
            
            return company[0];
        } 
        
        catch (error) {
            console.log(error);    
        }
    }
    

    public async GetByCategoryLimitEight(category: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            const companies = await conn.query('call getCompaniesByCategoryLimitEight(?)', [category]);

            return companies[0];
        } 
        
        catch (error) {
            console.log(error);    
        }
    }

    public async GetByCategory(category: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            const companies = await conn.query('call getCompaniesByCategory(?)', [category]);

            return companies[0];    
        } 
        
        catch (error) {
            
        }
    }

    public async Create(wallpaper: string, logo: string, name: string, description: string, phonenumber: string, email: string, password: string, category: string) : Promise<any> {
        try {
            const conn = await this.Connection;
            return await conn.query('call insertCompany(?, ?, ?, ?, ?, ?, ?, ?)', [wallpaper, logo, name, description, phonenumber, email, password, category]);
        } 
        
        catch (error) {
            console.log(error)   
        }
    }

    public async Update( id: number, wallpaper: string, logo: string, name: string, description: string, phonenumber: string, email: string, password: string ) : Promise<any> {
        try {
            const conn = await this.Connection;
            return await conn.query('call updateCompany(?, ?, ?, ?, ?, ?, ?, ?)', [id, wallpaper, logo, name, description, phonenumber, email, password])    
        } 
        
        catch (error) {
            console.log(error)
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