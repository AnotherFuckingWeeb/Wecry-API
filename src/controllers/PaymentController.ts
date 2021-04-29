import { Request, Response } from 'express';
import Stripe from 'stripe';
import { Payment } from '../interface/PaymentInterface'

export class PaymentController {

    public async Checkout(req: Request, res: Response) : Promise<any> {
        try {

            const stripe = new Stripe('sk_test_51IhvECJ94vJXO5BcrXDhX21HQSkoirLtNK6PMhNpM0RQ5Mp3CcvY9jDnONmKXQvjpdiJ5pPjsF03NJIu5ak4Jmri00YBvXxIGN', {
                apiVersion: '2020-08-27'
            });

            const { id, amount, description = 'this the description of the product' } : Payment = req.body;

            const payment = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
                description,
                payment_method: id,
                payment_method_types: ['card'],
                confirm: true
            })

            if (payment.status === 'succeeded') return res.json({ msg: 'Transaction Succeded' });

        } 
        
        catch (error) {
            console.log(error)    
        }
    } 

}