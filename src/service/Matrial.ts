import Material from "../database/models/material";
import { IMaterial } from "../database/types";

// Purpose: Service for Material model.
class MaterialService {
    // Method to get all Materials.
    static async getMaterials(): Promise<IMaterial[]> {
        return await Material.find({}).populate("category", "name").populate("subCategory", "name").select("name type link description category subCategory");
    }

    // Method to get Material by id.
    static async getMaterial(id?: string, name?: string): Promise<IMaterial | null> {
        if (id) {
            return await Material.findById(id);
        } else if (name) {
            return await Material.findOne({ name });
        } else {
            return null;
        }
    }

    // Method to add Material.
    static async addMaterial(name: string, subCategory: string, category: string, link: string, type: string, description?: string): Promise<IMaterial> {
        return await Material.create({ name, subCategory, category, link, type, description });
    }

    // Method to update Material.
    static async updateMaterial(id: string, name: string, category: string, notes?: string): Promise<IMaterial | null> {
        return await Material.findByIdAndUpdate(id, { name, category, notes }, { new: true });
    }

    // Method to delete Material.
    static async deleteMaterial(id: string): Promise<IMaterial | null> {
        return await Material.findByIdAndDelete(id);
    }
}

export default MaterialService;