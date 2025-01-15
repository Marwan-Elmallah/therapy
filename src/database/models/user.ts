import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types';



const userSchema = new Schema<IUser>({
    name: { type: String, required: true, unique: true },
    nationalId: { type: String, required: false, unique: true, default: "no national id yet" },
    notes: { type: String, required: false, default: 'No Notes Yet' },
    phone: { type: String, required: true, unique: true },
    mobile: { type: String, required: false, default: "no mobile yet" },
    diagnostic: { type: String, required: true }
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User;