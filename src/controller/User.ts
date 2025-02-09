import { NextFunction, Request, Response } from "express";
import UserService from "../service/User";
import { APIError } from "../middleware/errorHandler";

class UserController {
    static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const users = await UserService.getUsers();
        return res.status(200).json({ error: false, code: 200, data: users, message: 'Users fetched successfully' });
    }

    static async getUserById(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const userId = req.params.id;
        const user = await UserService.getUser(userId);
        if (!user) {
            new APIError({
                message: `User with ID ${userId} not found`,
                status: 404,
            });
        }
        return res.status(200).json({ error: false, code: 200, data: user, message: `User of ID ${userId} fetched successfully` });
    }

    static async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { name, nationalId, notes, mobile, phone, diagnostic } = req.body;
        const userExistBynationalId = await UserService.getUser(undefined, nationalId)
        const userExistByPhone = await UserService.getUser(undefined, undefined, phone)
        if (userExistBynationalId || userExistByPhone) {
            return res.status(400).json({
                error: true,
                code: 400,
                message: 'User already exist check your nationalId or phone',
            })
        }
        const newUser = await UserService.addUser(name, phone, diagnostic, mobile, nationalId, notes);
        return res.status(201).json({
            error: false,
            code: 201,
            data: newUser,
            message: 'User created successfully',
        });
    }

    static async updateUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const userId = req.params.id;
        const { name, nationalId, notes } = req.body;
        const updatedUser = await UserService.updateUser(userId, name, nationalId, notes);
        if (!updatedUser) {
            new APIError({
                message: `Error to update User with ID ${userId}`,
                status: 404,
            });
        }
        return res.status(200).json({
            error: false,
            code: 200,
            data: updatedUser,
            message: 'User updated successfully',
        });
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const userId = req.params.id;
        const deletedUser = await UserService.deleteUser(userId);
        if (!deletedUser) {
            new APIError({
                message: `Error to delete User with ID ${userId}`,
                status: 404,
            });
        }
        return res.status(200).json({
            error: false,
            code: 200,
            data: deletedUser,
            message: 'User deleted successfully',
        });
    }
}

export default UserController;