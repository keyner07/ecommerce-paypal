import jwt from 'jsonwebtoken';

import { IUser } from '../models/user.model';
import config from '../config/index';

export async function generateToken(user: IUser): Promise<string> {
    const secretKey: string | any = config.jwtSecret;
    return await jwt.sign({ id: user._id, role: user.isAdmin }, secretKey, {
        expiresIn: '1h',
    });
}