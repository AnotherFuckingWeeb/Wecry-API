import { Request, Response } from 'express';
import { ShoppingCartModel } from '../models/ShoppingCartModel';
import { IShoppingCart } from '../interface/ShoppingCartInterface'

export class ShoppingCartController {

    public async GetShoppingCart(req: Request, res: Response) : Promise<any> {
        try {
            const uid = parseInt(req.params.uid);
            const model: ShoppingCartModel = new ShoppingCartModel();
            const posts = await model.getShoppingCartByUserId(uid);

            return res.json({
                posts: posts[0]
            });
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async AddShoppingCart(req: Request, res: Response) : Promise<any> {
        try {
            const shoppingCart: IShoppingCart = req.body;
            const model: ShoppingCartModel = new ShoppingCartModel();
            
            await model.Add(shoppingCart.userId, shoppingCart.postId);

            return res.json({
                msg: 'Product was added to your shopping cart'
            });
        } 
        
        catch (error) {
            console.log(error);
        }
    }

    public async DeleteShoppingCart(req: Request, res: Response) : Promise<any> {
        try {
            const shoppingCartId = parseInt(req.params.id);
            const model: ShoppingCartModel = new ShoppingCartModel();

            await model.Delete(shoppingCartId);

            return res.json({
                msg: 'Product was removed from your shopping cart',
                isError: true
            });
            
        } 
        
        catch (error) {
            console.log(error);
        }
    }
}
