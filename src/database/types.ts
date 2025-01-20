import { ObjectId } from "mongoose";
interface ICategory extends Document {
    name: string;
    description?: string;
}


interface IMaterial extends Document {
    name: string;
    description?: string;
    type: "video" | "document" | "image";
    link: string;
    category: ObjectId;
    subCategory: ObjectId;
}


interface ISubCategory extends Document {
    name: string;
    description: string;
    category: ObjectId;
}

interface IUser extends Document {
    name: string;
    nationalId: string;
    phone: string;
    mobile: string
    diagnostic: string;
    notes: string;
}

interface IInvitation extends Document {
    user: ObjectId;
    material: ObjectId[];
}

export { ICategory, IMaterial, ISubCategory, IUser, IInvitation };