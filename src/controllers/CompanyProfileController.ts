import { Request, Response } from 'express';
import fs from 'fs'
import { CompanyModel } from '../models/CompanyModel';
import { PostModel } from '../models/PostModel';

export class CompanyProfileController {
    public async GetCompanyInfo(req: Request, res: Response) : Promise<Response> {
        try {
            const companyId = parseInt(req.params.cid);
            const companyModel: CompanyModel = new CompanyModel();
            const postModel: PostModel = new PostModel();
            
            const company = await companyModel.GetById(companyId);
            const posts = await postModel.GetByUserId(companyId);
        
            return res.json({
                company: company[0][0],
                posts: posts[0]
            });
        } 
        
        catch (error) {
            console.log(error);
            return res.json({ msg: error });
        }
    }

    public async DeleteCompany(req: Request, res: Response) : Promise<any> {
        try {
            const companyId = parseInt(req.params.cid);
            const model: CompanyModel = new CompanyModel();
            const requestedCompany = await model.GetById(companyId);
            const paths = {
                logo: `public/uploads/${requestedCompany[0][0].profile_image}`,
                wallpaper: `public/uploads/${requestedCompany[0][0].wallpaper}`
            }

            fs.unlink(paths.logo, async (err) => {
                if (err) console.log(err);

                fs.unlink(paths.wallpaper, (err) => {
                    if (err) console.log(err);
                })

                await model.Delete(companyId);
            })

            return res.json({ msg: 'Account Has Been Deleted' })
        } 
        
        catch (error) {
            console.log(error);
        }
    }
}