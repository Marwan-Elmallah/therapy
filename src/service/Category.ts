import Category from "../database/models/category";
import { ICategory } from "../database/types";

class CategoryService {
    static async getAllCategories(): Promise<ICategory[]> {
        const category = await Category.find({});
        return category;
    }

    static async getCategory(id?: string, name?: string): Promise<ICategory | null> {
        if (id) {
            const category = await Category.findById(id);
            return category;
        } else if (name) {
            const category = await Category.findOne({ name });
            return category;
        } else {
            return null;
        }
    }

    static async addCategory(name: string, description: string): Promise<ICategory> {
        const newCategory = await Category.create({ name, description });
        // console.log(newCategory);
        return newCategory;
    }

    static async updateCategory(id: string, newCategory: Partial<ICategory>): Promise<ICategory | null> {
        const category = await Category.findByIdAndUpdate(id, newCategory);
        return category;
    }

    static async deleteCategory(id: string): Promise<ICategory | null> {
        const category = await Category.findByIdAndDelete(id);
        return category;
    }
}

export default CategoryService;