import { Router } from 'express';
import categoryRoutes from './category';
import subCategoryRoutes from './subCategory';

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

router.use('/category', categoryRoutes);
router.use('/subCategory', subCategoryRoutes);

export default router;