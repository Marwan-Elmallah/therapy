import { model, Schema } from "mongoose";
import { ISubCategory } from "../types";



const SubCategorySchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
}, { timestamps: true });

const SubCategory = model<ISubCategory>('SubCategory', SubCategorySchema);

export default SubCategory;