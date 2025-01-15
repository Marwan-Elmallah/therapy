import multer, { FileFilterCallback, MulterError } from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, 'public/image');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Pass `null` for no error and `true` to accept the file
    } else {
        cb(new Error('Invalid file type. Only PNG, JPG, and JPEG are allowed.')); // Pass an `Error` object for invalid files
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }
});

const uploadImageMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const uploadSingle = upload.single('image');

    uploadSingle(req, res, (err: any) => {
        if (err) {
            if (err instanceof MulterError) {
                return res.status(400).json({ error: `Multer error: ${err.message}` });
            }
            return res.status(400).json({ error: err.message });
        }

        next();
    });
};

const uploadImagesMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const uploadMany = upload.array("images", 5);

    uploadMany(req, res, (err: any) => {
        if (err) {
            if (err instanceof MulterError) {
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    return res.status(400).json({
                        error: `You can upload a maximum of 5 images.`
                    });
                }
                return res.status(400).json({
                    error: `Multer error: ${err.message}`
                });
            }

            return res.status(400).json({
                error: err.message
            });
        }

        next();
    });
};

export { uploadImageMiddleware, uploadImagesMiddleware };