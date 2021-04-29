import { Request, Response } from 'express';
import { upload } from '../multer.config'
import { ICompany } from '../interface/CompanyInterface'
import { AccountModel } from '../models/AccountModel'
import { CompanyModel } from '../models/CompanyModel'

export class CompanySignUpController {

    public async SignUp(req: Request, res: Response) : Promise<any> {
        const companySignUpFields = upload.fields([
            {
                name: 'wallpaper',
                maxCount: 1
            },
            {
                name: 'logo',
                maxCount: 1
            }
        ]);

        companySignUpFields(req, res, async () => {
            try {
                const company: ICompany = req.body;
                const files = req.files as { [fieldname: string] : Express.Multer.File[] };
                const accountModel: AccountModel = new AccountModel();
                const companyModel: CompanyModel = new CompanyModel();
                const account = await accountModel.GetAccountByEmail(company.email);
                
                if (account[0].length > 0) {
                    return res.json({
                        msg: 'Email already in use',
                        error: true
                    })
                }

                else {
                    company.wallpaper = files["wallpaper"][0].filename;
                    company.logo = files["logo"][0].filename;
                    const { wallpaper, logo, name, email, password, phonenumber, category, description } = company

                    await companyModel.Create(wallpaper, logo, name, description, phonenumber, email, password, category);

                    return res.json({
                        msg: 'Company has been created',
                        error: false
                    })
                }
                
            } 
            
            catch (error) {
                console.log(error)    
            }
        })
    }

}