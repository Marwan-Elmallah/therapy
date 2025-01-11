import { Router } from 'express';
import SubCategoryController from '../controller/subCategory';
import { createSubCategoryValidator } from '../middleware/validateor';

const router = Router();

// Get all categories
router.get('/', SubCategoryController.getAllSubCategories);

// Get SubCategory by ID
router.get('/:id', SubCategoryController.getSubCategoryById);

// Create a new SubCategory
router.post('/', createSubCategoryValidator, SubCategoryController.createSubCategory);

// Update an existing SubCategory
router.put('/:id', SubCategoryController.updateSubCategory);

// Delete a SubCategory
router.delete('/:id', SubCategoryController.deleteSubCategory);


export default router;