import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { IUser } from '../models/user.model';
import config from '../config/index';

export async function generateToken(user: IUser): Promise<string> {
    const secretKey: string | any = config.jwtSecret;
    return await jwt.sign({ id: user._id, role: user.isAdmin }, secretKey, {
        expiresIn: '1h',
    });
}

export async function comparePassword(password: string, hashPassword: IUser['password']): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (err) {
        return false;
        console.error(`[COMP] The problem is ${err}`);
    }
}