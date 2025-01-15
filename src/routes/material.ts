import { Router } from 'express';
import { createMaterialValidator } from '../middleware/validateor';
import MaterialController from '../controller/Matrial';
const router = Router();



// Get all Materials
router.get('/', MaterialController.getAllMaterials);

// Get Material by ID
router.get('/:id', MaterialController.getMaterialById);

// Create a new Material
router.post('/', createMaterialValidator, MaterialController.create);

// Update an existing Material
router.put('/:id', MaterialController.updateMaterial);

// Delete a Material
router.delete('/:id', MaterialController.deleteMaterial);


export default router;