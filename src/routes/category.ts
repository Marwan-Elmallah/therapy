import { Router } from 'express';
import CategoryController from '../controller/Category';
import { createCategoryValidator } from '../middleware/validateor';

const router = Router();

// Get all categories
router.get('/', CategoryController.getAllCategories);

// Get category by ID
router.get('/:id', CategoryController.getCategoryById);

// Create a new category
router.post('/', createCategoryValidator, CategoryController.createCategory);

// Update an existing category
router.put('/:id', CategoryController.updateCategory);

// Delete a category
router.delete('/:id', CategoryController.deleteCategory);


export default router;