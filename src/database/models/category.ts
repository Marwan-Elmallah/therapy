import { Schema, model, Document } from 'mongoose';
import { ICategory } from '../types';



const CategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
}, { timestamps: true });

const Category = model<ICategory>('Category', CategorySchema);

export default Category;