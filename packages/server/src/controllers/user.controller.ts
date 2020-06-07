import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

import { generateToken, comparePassword } from '../auth/index';

export async function signUp(req: Request, res: Response): Promise<Response> {
    try {
        const { name, email, password, isAdmin } = req.body;
        if (!name || !email || !password || !isAdmin) {
            return res.status(400).json({ message: 'Please. Send all your data.' });
        }

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: 'The user already exists.' });
        }
        const newUser = new User(req.body);
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(500).json({ message: 'The server has a error.' });
        console.error(`[CSU] The problem is ${err}`);
    }
}

export async function signIn(req: Request, res: Response): Promise<Response> {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please. Send your email and password.' });
        }
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: "The user doesn't exists." });
        }
        const isMatch = await comparePassword(password, user.password);
        if (isMatch) {
            return res.status(400).json({ token: generateToken(user) });
        }

        return res.status(400).json({ message: 'The email or password are incorrect.' });
    } catch (err) {
        return res.status(500).json({ message: 'The server has a error.' });
        console.error(`[CSI] The problem is ${err}`);
    }
}
