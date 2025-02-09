import { Router } from 'express';
import UserController from '../controller/User';
import { createUserValidator } from '../middleware/validateor';

const router = Router();

// Get all categories
router.get('/', UserController.getAllUsers);

// Get User by ID
router.get('/:id', UserController.getUserById);

// Create a new User
router.post('/', createUserValidator, UserController.create);

// Update an existing User
router.put('/:id', UserController.updateUser);

// Delete a User
router.delete('/:id', UserController.deleteUser);



export default router;