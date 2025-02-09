import { NextFunction, Request, Response } from 'express';
import MaterialService from "../service/Matrial";
import { APIError } from '../middleware/errorHandler';

class MaterialController {
    static async getAllMaterials(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const materials = await MaterialService.getMaterials();
        return res.status(200).json({
            error: false,
            code: 200,
            data: materials,
            message: 'Materials fetched successfully'
        });
    }

    static async getMaterialById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params;
        const material = await MaterialService.getMaterial(id);
        if (!material) {
            new APIError({
                message: `Material with ID ${id} not found`,
                status: 404,
            });
        }
        return res.status(200).json({
            error: false,
            code: 200,
            data: material,
            message: `Material of ID ${id} fetched successfully`,
        });
    }

    static async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { name, subCategory, category, link, type, description } = req.body;
        const existingMaterial = await MaterialService.getMaterial(undefined, name);
        if (existingMaterial) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: `Material with name '${name}' already exists`,
            })
        }
        const material = await MaterialService.addMaterial(name, subCategory, category, link, type, description);
        return res.status(200).json({
            error: false,
            code: 200,
            data: material,
            message: 'Material added successfully',
        });
    }

    static async updateMaterial(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params;
        const { name, description } = req.body;
        console.log(req.body);


        const material = await MaterialService.updateMaterial(id, name, description);
        if (!material) {
            new APIError({
                message: `Error to update Material with ID ${id}`,
                status: 404,
            });
        }
        return res.status(200).json({
            error: false,
            code: 200,
            data: material,
            message: `Material of ID ${id} updated successfully`,
        });
    }

    static async deleteMaterial(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params;
        const material = await MaterialService.deleteMaterial(id);
        if (!material) {
            new APIError({
                message: `Material with ID ${id} not found`,
                status: 404,
            });
        }
        return res.status(200).json({
            error: false,
            code: 200,
            message: `Material of ID ${id} deleted successfully`,
        });
    }

}

export default MaterialController