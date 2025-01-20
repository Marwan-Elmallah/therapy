import { Router } from 'express';
import { createInvitationValidator } from '../middleware/validateor';
import InvitationController from '../controller/Invitation';
const router = Router();



// Get all Materials
router.get('/', InvitationController.getAllInvitations);

// Get Material by ID
router.get('/:id', InvitationController.getInvitation);

// Create a new Material
router.post('/', createInvitationValidator, InvitationController.addInvitation);

// Update an existing Material
router.put('/:id', InvitationController.updateInvitation);

// Delete a Material
router.delete('/:id', InvitationController.deleteInvitation);


export default router;