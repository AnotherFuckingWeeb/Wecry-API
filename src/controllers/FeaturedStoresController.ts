import { Request, Response } from 'express';
import { CompanyModel } from '../models/CompanyModel';

export class FeaturedStoresController {
    public async GetStoresByCategory(req: Request, res: Response) : Promise<Response> {
        try {
            const category = req.params.category;
            const model: CompanyModel = new CompanyModel();
            const companies = await model.GetByCategoryLimitEight(category);

            return res.json({
                companies: companies[0]
            });
        
        } 
        
        catch (error) {
            console.log(error);
            return res.json({ msg: error });
        }
    }
}