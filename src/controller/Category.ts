import { NextFunction, Request, Response } from 'express';
import CategoryService from '../service/Category';
import { APIError } from '../middleware/errorHandler';

class CategoryController {
    // Get all categories
    static async getAllCategories(req: Request, res: Response, next: NextFunction) {
        const categories = await CategoryService.getAllCategories();
        res.status(200).json({
            error: false,
            code: 200,
            data: categories,
            message: 'Categories fetched successfully'
        });
    }

    // Get category by ID
    static async getCategoryById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const category = await CategoryService.getCategory(id);
        if (!category) {
            new APIError({
                message: `Category with ID ${id} not found`,
                status: 404,
            });
        }
        res.status(200).json({
            error: false,
            code: 200,
            data: category,
            message: `Category of ID ${id} fetched successfully`,
        });
    }

    // Create a new category
    static async createCategory(req: Request, res: Response, next: NextFunction) {
        const { name, description } = req.body;
        const categoryExists = await CategoryService.getCategory(undefined, name);
        if (categoryExists) {
            res.status(400).json({
                error: true,
                code: 400,
                message: 'Category already exist',
            })
        } else {
            const newCategory = await CategoryService.addCategory(name, description);
            res.status(201).json({
                error: false,
                code: 201,
                data: newCategory,
                message: 'Category created successfully',
            });
        }
    }


    // Update an existing category
    static async updateCategory(req: Request, res: Response, next: NextFunction) {
        const categoryId = req.params.id;
        const updatedCategoryData = req.body;
        const updatedCategory = await CategoryService.updateCategory(categoryId, updatedCategoryData);

        if (!updatedCategory) {
            new APIError({
                message: `Error to update Category with ID ${categoryId}`,
                status: 404,
            });
        }

        res.status(200).json({
            error: false,
            code: 200,
            data: updatedCategory,
            message: `Category ${categoryId} updated successfully`,
        });
    }

    // Delete a category
    static async deleteCategory(req: Request, res: Response, next: NextFunction) {
        const categoryId = req.params.id;
        const deletedCategory = await CategoryService.deleteCategory(categoryId);

        if (!deletedCategory) {
            new APIError({
                message: `Category with ID ${categoryId} not found for deletion`,
                status: 404,
            });
        }

        res.status(200).json({
            error: false,
            code: 200,
            message: `Category ${categoryId} deleted successfully`,
        });
    }
}

export default CategoryController;
