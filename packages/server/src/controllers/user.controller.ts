import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';

import { generateToken, comparePassword } from '../auth/index';

export async function signUp(req: Request, res: Response): Promise<Response> {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return await res.status(400).json({ message: 'Please. Send all your data.' });
        }

        const user = await User.findOne({ email: email });
        if (user) {
            return await res.status(400).json({ message: 'The user already exists.' });
        }
        const newUser = new User(req.body);
        await newUser.save();
        return await res.status(201).json(newUser);
    } catch (err) {
        return await res.status(500).json({ message: `The server has an error. ${err}` });
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
            return await res.status(400).json({ message: "The user doesn't exists." });
        }
        const isMatch = await comparePassword(password, user.password);
        if (isMatch) {
            return await res.status(200).json({ token: await generateToken(user) });
        }

        return await res.status(400).json({ message: 'The email or password are incorrect.' });
    } catch (err) {
        return await res.status(500).json({ message: `The server has an error. ${err}` });
        console.error(`[CSI] The problem is ${err}`);
    }
}

export async function updateUser(req: Request, res: Response): Promise<Response> {
    try {
        const id = parseInt(req.params.id);
        const user = await User.findById(id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            const result = await user.save();
            return res.status(200).json({ message: "Succesful", result });
        } else {
            return res.status(400).json({ message: "User not found."});
        }
    } catch (err) {
        return res.status(500).json({ message: 'Occur problem with the server.'});
    }
}
