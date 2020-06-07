import { Request, Response } from 'express';
import Order from '../models/order.model';

export async function getOrders(req: Request, res: Response): Promise<Response> {
    try {
        const orders = await Order.find().populate('user');
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ message: "Occur a problem with the server." });
    }
}