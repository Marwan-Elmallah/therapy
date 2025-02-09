import { Schema, Document, model } from "mongoose";
import { IMaterial } from "../types";

const MaterialSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, "Material name is required"],
        unique: true,
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"],
    },
    description: {
        type: String,
        trim: true,
        default: "",
    },
    type: {
        type: String,
        required: [true, "Material type is required"],
        enum: {
            values: ["file", "link"],
            message: "Type must be one of: file or link",
        },
    },
    link: {
        type: String,
        required: [true, "Material link is required"],
        validate: {
            validator: function (v: string) {
                return /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm.test(v); // Basic URL validation
            },
            message: "Please enter a valid URL",
        },
    },
    category: {
        type: Schema.Types.ObjectId,
        required: [true, "Category is required"],
        ref: "Category",
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        required: [true, "SubCategory is required"],
        ref: "SubCategory",
    },
}, {
    timestamps: true
}
);

const Material = model<IMaterial>("Material", MaterialSchema);

export default Material;
