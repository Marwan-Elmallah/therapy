import Invitation from "../database/models/invitation";
import { IInvitation } from "../database/types";

class InvitationService {
    static async addInvitation(user: string, material: string[]): Promise<IInvitation> {
        return await Invitation.create({ user, material });
    }

    static async getInvitations(): Promise<IInvitation[]> {
        return await Invitation.find({}).populate("user", "name").populate("material", "name link").select("user material");
    }

    static async deleteInvitation(id: string): Promise<IInvitation | null> {
        return await Invitation.findByIdAndDelete(id);
    }

    static async getInvitation(id: string): Promise<IInvitation | null> {
        return await Invitation.findById(id).populate("user", "name").populate("material", "name").select("user material");
    }

    static async updateInvitation(id: string, user: string, material: string[]): Promise<IInvitation | null> {
        return await Invitation.findByIdAndUpdate(id, { user, material }, { new: true });
    }
}

export default InvitationService