import { Schema, model, Document } from 'mongoose';
import { IUser } from '../types';



const userSchema = new Schema<IUser>({
    name: { type: String, required: true, unique: true },
    nationalId: { type: String, required: true, unique: true },
}, { timestamps: true });

const User = model<IUser>('User', userSchema);

export default User;