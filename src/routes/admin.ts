import { Router } from 'express';
import AdminController from '../controller/Admin';

const router = Router();

router.post('/login', AdminController.Login);

export default router;