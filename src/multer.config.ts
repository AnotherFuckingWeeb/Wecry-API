import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import path from 'path'
import { AccountModel } from './models/AccountModel';

const storage: multer.StorageEngine = multer.diskStorage({
    destination: 'public/uploads',
    filename: (req: Request, file: Express.Multer.File, callback) : void => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const checkFileType = (file: Express.Multer.File, callback: FileFilterCallback) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname =  fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extname) {
        return callback(null, true);
    }

    else {
        callback(Error(`File upload only supports the following filetypes - ${fileTypes}`))
    }
}

export const upload = multer({
    storage,
    dest: 'public/uploads',
    limits: { fileSize: 1000000 },
    fileFilter: async (req: Request, file: Express.Multer.File, callback) : Promise<void> => {
        /*
            in case user exists
            if user exists image will not be uploaded
            if it doesn't it will
        */
        const account = new AccountModel();
        const acc = await account.GetAccountByEmail(req.body.email);

        if (acc[0].length > 0) {
            console.log("User exists")
            callback(null, false);
        }

        else checkFileType(file, callback);
    }
});
