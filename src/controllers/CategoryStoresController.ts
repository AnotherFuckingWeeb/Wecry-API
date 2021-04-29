import { Request, Response } from 'express';
import { CompanyModel } from '../models/CompanyModel';

export class CategoryStoresController {

    public async GetStoresByCategory(req: Request, res: Response) : Promise<any> {
        try {
            const category = req.params.category;
            const model: CompanyModel = new CompanyModel();
            const stores = await model.GetByCategory(category);
            
            return res.json({
                stores: stores[0]
            });

        } 
        
        catch (error) {
            console.log(error);    
        }
    }

}