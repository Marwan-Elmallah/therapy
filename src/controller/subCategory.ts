import { NextFunction, Request, Response } from 'express';
import SubCategoryService from '../service/SubCategory';
import { APIError } from '../middleware/errorHandler';

class SubCategoryController {
    // Get all subCategories
    static async getAllSubCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const subCategories = await SubCategoryService.getAllSubCategories();
            res.status(200).json({
                error: false,
                code: 200,
                data: subCategories,
                message: 'subCategories fetched successfully'
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }

    // Get SubCategory by ID
    static async getSubCategoryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const SubCategory = await SubCategoryService.getSubCategory(id);
            if (!SubCategory) {
                throw new APIError({
                    message: `SubCategory with ID ${id} not found`,
                    status: 404,
                });
            }
            res.status(200).json({
                error: false,
                code: 200,
                data: SubCategory,
                message: `SubCategory of ID ${id} fetched successfully`,
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }

    // Create a new SubCategory
    static async createSubCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, description, category } = req.body;
            const SubCategoryExists = await SubCategoryService.getSubCategory(undefined, name);
            if (SubCategoryExists) {
                throw new APIError({
                    message: `SubCategory with name ${name} already exists`,
                    status: 400,
                });
            } else {
                const newSubCategory = await SubCategoryService.addSubCategory(name, description, category);
                res.status(201).json({
                    error: false,
                    code: 201,
                    data: newSubCategory,
                    message: 'SubCategory created successfully',
                });
            }
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }


    // Update an existing SubCategory
    static async updateSubCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const SubCategoryId = req.params.id;
            const updatedSubCategoryData = req.body;
            const updatedSubCategory = await SubCategoryService.updateSubCategory(SubCategoryId, updatedSubCategoryData);

            if (!updatedSubCategory) {
                throw new APIError({
                    message: `SubCategory with ID ${SubCategoryId} not found for update`,
                    status: 404,
                });
            }

            res.status(200).json({
                error: false,
                code: 200,
                data: updatedSubCategory,
                message: `SubCategory ${SubCategoryId} updated successfully`,
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }

    // Delete a SubCategory
    static async deleteSubCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const SubCategoryId = req.params.id;
            const deletedSubCategory = await SubCategoryService.deleteSubCategory(SubCategoryId);

            if (!deletedSubCategory) {
                throw new APIError({
                    message: `SubCategory with ID ${SubCategoryId} not found for deletion`,
                    status: 404,
                });
            }

            res.status(200).json({
                error: false,
                code: 200,
                message: `SubCategory ${SubCategoryId} deleted successfully`,
            });
        } catch (error) {
            next(error); // Pass the error to the global error handler
        }
    }
}

export default SubCategoryController;
