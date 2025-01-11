import SubCategory from "../database/models/subCategory";
import { ISubCategory } from "../database/types";

class SubCategoryService {
    static async getAllSubCategories(): Promise<ISubCategory[]> {
        const subCategory = await SubCategory.find({}).populate('category', 'name').select('name description category');
        return subCategory;
    }

    static async getSubCategory(id?: string, name?: string): Promise<ISubCategory | null> {
        if (id) {
            const subCategory = await SubCategory.findById(id).populate('category', 'name').select('name description category');
            return subCategory;
        } else if (name) {
            const subCategory = await SubCategory.findOne({ name }).populate('category', 'name').select('name description category');
            return subCategory;
        } else {
            return null;
        }
    }

    static async addSubCategory(name: string, description: string, category: string): Promise<ISubCategory> {
        const newSubCategory = await SubCategory.create({ name, description, category });
        // console.log(newSubCategory);
        return newSubCategory;
    }

    static async updateSubCategory(id: string, newSubCategory: Partial<ISubCategory>): Promise<ISubCategory | null> {
        const subCategory = await SubCategory.findByIdAndUpdate(id, newSubCategory);
        return subCategory;
    }

    static async deleteSubCategory(id: string): Promise<ISubCategory | null> {
        const subCategory = await SubCategory.findByIdAndDelete(id);
        return subCategory;
    }
}

export default SubCategoryService;