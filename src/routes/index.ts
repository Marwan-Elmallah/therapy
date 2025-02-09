import { Router } from 'express';
import categoryRoutes from './category';
import subCategoryRoutes from './subCategory';
import userRoutes from './user';
import materialRoutes from './material';
import invitationRoutes from './invitation';
import adminRoutes from './admin';
import UploadsController from '../controller/handleUploads';
import { uploadImageMiddleware } from '../middleware/uploads';

const router = Router();

router.get('/', (req, res) => {
    res.send("Ok !");
});

router.get('/status', (req, res) => {
    res.status(200).json({
        status: "Online",
        Date: new Date()
    });
})

router.post("/upload", uploadImageMiddleware, UploadsController.uploadImage)
router.use('/category', categoryRoutes);
router.use('/subCategory', subCategoryRoutes);
router.use('/user', userRoutes);
router.use('/material', materialRoutes);
router.use("/invitation", invitationRoutes);
router.use("/admin", adminRoutes);

export default router;