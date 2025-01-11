import { NextFunction, Request, Response } from 'express';
import CategoryService from '../service/Category';
import { APIError } from '../middleware/errorHandler';

class CategoryController {
    // Get all categories
    static async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categories = await CategoryService.getAllCategories();
            res.status(200).json({
                error: false,
                code: 200,
                data: categories,
                message: 'Categories fetched successfully'
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }

    // Get category by ID
    static async getCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const category = await CategoryService.getCategory(id);
            if (!category) {
                throw new APIError({
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
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }

    // Create a new category
    static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description } = req.body;
            const categoryExists = await CategoryService.getCategory(undefined, name);
            if (categoryExists) {
                throw new APIError({
                    message: `Category with name ${name} already exists`,
                    status: 400,
                });
            } else {
                const newCategory = await CategoryService.addCategory(name, description);
                res.status(201).json({
                    error: false,
                    code: 201,
                    data: newCategory,
                    message: 'Category created successfully',
                });
            }
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }


    // Update an existing category
    static async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = req.params.id;
            const updatedCategoryData = req.body;
            const updatedCategory = await CategoryService.updateCategory(categoryId, updatedCategoryData);

            if (!updatedCategory) {
                throw new APIError({
                    message: `Category with ID ${categoryId} not found for update`,
                    status: 404,
                });
            }

            res.status(200).json({
                error: false,
                code: 200,
                data: updatedCategory,
                message: `Category ${categoryId} updated successfully`,
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }

    // Delete a category
    static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const categoryId = req.params.id;
            const deletedCategory = await CategoryService.deleteCategory(categoryId);

            if (!deletedCategory) {
                throw new APIError({
                    message: `Category with ID ${categoryId} not found for deletion`,
                    status: 404,
                });
            }

            res.status(200).json({
                error: false,
                code: 200,
                message: `Category ${categoryId} deleted successfully`,
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }
}

export default CategoryController;
