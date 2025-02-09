import { Request, Response } from 'express';

class UploadsController {
    static async uploadImage(req: Request, res: Response) {
        if (!req.file) {
            res.status(400).json({
                error: true,
                code: 400,
                message: "Please upload an image"
            });
        }
        if (req.files) {
            res.status(400).json({
                error: true,
                code: 400,
                message: "Please upload only one image"
            });
        }
        res.status(200).json({
            error: false,
            code: 200,
            message: "Image uploaded successfully",
            data: {
                fileUrl: req.file ? `${req.protocol}://${req.get('host')}/image/${req.file.filename}` : ''
            }
        });
    }

    static async uploadImages(req: Request, res: Response) {

        if (!req.files) {
            res.status(400).json({
                error: true,
                code: 400,
                message: "Please upload images"
            });
        }
        const fileUrl: string[] = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => {
            return `${req.protocol}://${req.get('host')}/image/${file.filename}`;
        });
        res.status(200).json({
            error: false,
            code: 200,
            message: "Images uploaded successfully",
            data: fileUrl
        });
    }
}

export default UploadsController;