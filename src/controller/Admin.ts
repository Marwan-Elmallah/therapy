import { NextFunction, Request, Response } from 'express';

export default class AdminController {
    static async Login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body as { email: string, password: string };
        const token = "Bearer " + Buffer.from(`${email}:${password}`).toString("base64");
        if (email === "heba@admin.com" && password === "Heba@Amin") {
            res.status(202).json({
                message: "Welcome Heba",
                code: 202,
                token
            });
        } else {
            res.status(400).json({ message: "Invalid Credentials" });
        }
    }
}
