import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

import config from '../config/index';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    created_At: {
        type: Date,
        default: Date.now
    },
    last_session: {
        type: Date,
        default: Date.now
    }
});

export interface IUser extends Document {
    _id: Schema.Types.ObjectId,
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    created_At: Date,
    last_session: Date
}
userSchema.pre<IUser>('save', async function (next: () => void) {
    if (!this.isModified('password')) return next();
    const saltConfig: any = config.salt;
    const salt = await bcrypt.genSalt(parseInt(saltConfig));
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        return false;
        console.error(`[COMP] The problem is ${err}`);
    }
};
userSchema.methods.updateLastSession = async function(): Promise<boolean> {
    try {
        this.last_session = Date.now;
        return true;
    } catch (err) {
        return false;
        console.error(`[UM] This is the problem ${err}`);
    }
};

export default model<IUser>('User', userSchema);