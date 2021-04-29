import { Request, Response } from 'express'
import { ICompany } from '../interface/CompanyInterface'
import { CompanyModel } from '../models/CompanyModel'
import { upload } from '../../src/multer.config'
import fs from 'fs'

export class EditCompanyProfileController {

    public async EditCompanyProfileController(req: Request, res: Response) : Promise<Response> {
        try {

            const editCompanyProfile = upload.fields([
                {
                    name: 'edit-wallpaper',
                    maxCount: 1
                },
                {
                    name: 'edit-logo',
                    maxCount: 1
                }
            ]);
    
            editCompanyProfile(req, res, async () => {
                if (req.files) {
                    const id = parseInt(req.params.id);
                    const model: CompanyModel = new CompanyModel();
                    const company: ICompany = req.body;
                    const requestedCompany = await model.GetById(id);
                    const files = req.files as { [fieldname: string] : Express.Multer.File[] };
                    
                    const paths = {
                        wallpaper: `public/uploads/${requestedCompany[0][0].wallpaper}`,
                        logo: `public/uploads/${requestedCompany[0][0].profile_image}`
                    };
    
                    fs.stat(paths.wallpaper, (err) => {
                        if (err) {
                            console.log(err)
                        }
    
                        else {
                            fs.unlink(paths.wallpaper, (err) => {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                    })
    
                    fs.stat(paths.logo, (err) => {
                        if (err) {
                            console.log(err)
                        }
    
                        else {
                            fs.unlink(paths.logo, (err) => {
                                if (err) {
                                    console.log(err)
                                }
                            })
                        }
                    })
    
                    company.wallpaper = files["edit-wallpaper"][0].filename;
                    company.logo = files["edit-logo"][0].filename;
    
                    await model.Update(id, company.wallpaper, company.logo, company.name, company.description, company.phonenumber, company.email, company.password);
                }

            })
            
            return res.json("Company Has Been Updated");    
        } 
        
        catch (error) {
            return res.json(error)
        }
    } 

}