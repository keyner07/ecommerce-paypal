/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import Order from '../models/order.model';

export async function getOrders(req: Request, res: Response): Promise<Response> {
    try {
        const orders = await Order.find().populate('user');
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json({ message: 'Occur a problem with the server.' });
    }
}

export async function getOrder(req: Request, res: Response): Promise<Response> {
    try {
        const idOrder: string = req.params.id;
        const order = await Order.findById(idOrder);
        if (order) {
            return res.status(200).json(order);
        } else {
            return res.status(404).json({ message: 'Order not found.' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Occur a problem with the server.' });
    }
}

export async function deleteOrder(req: Request, res: Response): Promise<Response> {
    interface IUser {
        _id: string;
        isAdmin: boolean;
        name: string;
        email: string;
    }
    try {
        const user: IUser | any = req.user;
        if (!user.isAdmin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const order = await Order.findById(req.params.id);
        if (order) {
            const removeOrder = await order.remove();
            return res.status(200).json(removeOrder);
        } else {
            return res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Occur a problem with the server.' });
    }
}

export async function createOrder(req: Request, res: Response): Promise<Response> {
    try {
        const newOrder = new Order({
            orderItems: req.body.orderItems,
            // @ts-ignore
            user: req.user?._id,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
        });
        const newOrderCreated = await newOrder.save();
        return res.status(201).json({ message: 'Order created', newOrderCreated });
    } catch (err) {
        return res.status(500).json({ message: 'Occur a problem with the server.' });
    }
}

export async function paymentMethod(req: Request, res: Response): Promise<Response> {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            // @ts-ignore
            order.isPaid = true;
            // @ts-ignore
            order.paidAt = Date.now();
            // @ts-ignore
            order.payment = {
                paymentMethod: 'paypal',
                paymentResult: {
                    payerID: req.body.payerID,
                    orderID: req.body.orderID,
                    paymentID: req.body.paymentID,
                },
            };
            const updateOrder = await order.save();
            return res.status(200).json({ message: 'Order paid.', updateOrder });
        } else {
            return res.status(404).json({ message: 'Order not found.' });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Occur a problem with the server.' });
    }
}
