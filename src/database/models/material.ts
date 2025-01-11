import { Schema, Document, model } from "mongoose";
import { IMatrial } from "../types";



const MaterialSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    type: { type: String, required: true },
    link: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    subCategory: { type: Schema.Types.ObjectId, required: true, ref: 'SubCategory' },
}, { timestamps: true });

const Material = model<IMatrial>('Material', MaterialSchema);

export default Material;