interface ICategory extends Document {
    name: string;
    description?: string;
}

interface IMatrial extends Document {
    name: string;
    description: string;
    type: string;
    link: string;
    category: string;
    subCategory: string;
}

interface ISubCategory extends Document {
    name: string;
    description: string;
    category: string;
}

interface IUser extends Document {
    name: string;
    nationalId: string;
}

export { ICategory, IMatrial, ISubCategory, IUser };