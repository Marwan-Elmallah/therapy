import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types';



const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    nationalId: { type: String, required: false, default: 'Empty!' },
    notes: { type: String, required: false, default: 'Empty!' },
    phone: { type: String, required: true, unique: true },
    mobile: { type: String, required: false, default: "no mobile yet" },
    diagnostic: { type: String, required: true }
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User;