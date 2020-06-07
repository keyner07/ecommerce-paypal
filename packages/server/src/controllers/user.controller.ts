import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

import { generateToken } from '../auth/index';

export async function signUp( req: Request, res: Response): Promise<Response> {
    const { name, email, password, isAdmin } = req.body;
    if (!name || !email || !password || !isAdmin ) {
        return res.status(400).json({ message: "Please. Send all your data." });
    }

    const user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: "The user already exists." });
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser);
}