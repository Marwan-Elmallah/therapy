import { NextFunction, Request, Response } from 'express';
import SubCategoryService from '../service/SubCategory';
import { APIError } from '../middleware/errorHandler';

class SubCategoryController {
    // Get all subCategories
    static async getAllSubCategories(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const subCategories = await SubCategoryService.getAllSubCategories();
        return res.status(200).json({
            error: false,
            code: 200,
            data: subCategories,
            message: 'subCategories fetched successfully'
        });
    }

    // Get SubCategory by ID
    static async getSubCategoryById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params;
        const SubCategory = await SubCategoryService.getSubCategory(id);
        if (!SubCategory) {
            new APIError({
                message: `SubCategory with ID ${id} not found`,
                status: 404,
            });
        }
        return res.status(200).json({
            error: false,
            code: 200,
            data: SubCategory,
            message: `SubCategory of ID ${id} fetched successfully`,
        });
    }

    // Create a new SubCategory
    static async createSubCategory(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { name, description, category } = req.body;
        const SubCategoryExists = await SubCategoryService.getSubCategory(undefined, name);
        if (SubCategoryExists) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: 'sub category already exist',
            })
        } else {
            const newSubCategory = await SubCategoryService.addSubCategory(name, description, category);
            return res.status(201).json({
                error: false,
                code: 201,
                data: newSubCategory,
                message: 'SubCategory created successfully',
            });
        }
    }

    // Update an existing SubCategory
    static async updateSubCategory(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const SubCategoryId = req.params.id;
        const updatedSubCategoryData = req.body;
        const updatedSubCategory = await SubCategoryService.updateSubCategory(SubCategoryId, updatedSubCategoryData);
        if (!updatedSubCategory) {
            new APIError({
                message: `Error to update SubCategory with ID ${SubCategoryId} `,
                status: 404,
            });
        }

        return res.status(200).json({
            error: false,
            code: 200,
            data: updatedSubCategory,
            message: `SubCategory ${SubCategoryId} updated successfully`,
        });
    }

    // Delete a SubCategory
    static async deleteSubCategory(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const SubCategoryId = req.params.id;
        const deletedSubCategory = await SubCategoryService.deleteSubCategory(SubCategoryId);

        if (!deletedSubCategory) {
            new APIError({
                message: `SubCategory with ID ${SubCategoryId} not found for deletion`,
                status: 404,
            });
        }

        return res.status(200).json({
            error: false,
            code: 200,
            message: `SubCategory ${SubCategoryId} deleted successfully`,
        });
    }
}

export default SubCategoryController;
