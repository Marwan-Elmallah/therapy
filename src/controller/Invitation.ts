import { NextFunction, Request, Response } from 'express';
import InvitationService from '../service/Invitation';
import { APIError } from '../middleware/errorHandler';
class InvitationController {
    static async getAllInvitations(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const invitations = await InvitationService.getInvitations();
        return res.status(200).json({ error: false, code: 200, data: invitations, message: 'Invitations fetched successfully' });
    }

    static async getInvitation(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params;
        const invitation = await InvitationService.getInvitation(id);
        if (!invitation) {
            new APIError({
                message: `Invitation with ID ${id} not found`,
                status: 404,
            });
        }
        return res.status(200).json({ error: false, code: 200, data: invitation, message: `Invitation of ID ${id} fetched successfully` });
    }

    static async addInvitation(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { user, material } = req.body;
        const invitation = await InvitationService.addInvitation(user, material);
        return res.status(200).json({ error: false, code: 200, data: invitation, message: 'Invitation added successfully' });
    }

    static async updateInvitation(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params;
        const { user, material } = req.body;
        const invitation = await InvitationService.updateInvitation(id, user, material);
        if (!invitation) {
            new APIError({
                message: `Error to update Invitation with ID ${id}`,
                status: 404,
            });
        }
        return res.status(200).json({ error: false, code: 200, data: invitation, message: `Invitation of ID ${id} updated successfully` });
    }

    static async deleteInvitation(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const { id } = req.params;
        const invitation = await InvitationService.deleteInvitation(id);
        if (!invitation) {
            new APIError({
                message: `Error to delete Invitation with ID ${id}`,
                status: 404,
            });
        }
        return res.status(200).json({ error: false, code: 200, data: invitation, message: `Invitation of ID ${id} deleted successfully` });
    }
}

export default InvitationController;