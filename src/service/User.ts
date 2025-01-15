import User from "../database/models/user";
import { IUser } from "../database/types";

// Purpose: Service for User model.
class UserService {
    // Method to get all users.
    static async getUsers(): Promise<IUser[]> {
        return await User.find({});
    }

    // Method to get user by id.
    static async getUser(id?: string, nationalId?: string, phone?: string): Promise<IUser | null> {
        if (id) {
            return await User.findById(id);
        } else if (nationalId) {
            return await User.findOne({ nationalId });
        } else if (phone) {
            return await User.findOne({ phone });
        } else {
            return null;
        }
    }

    // Method to add user.
    static async addUser(name: string, phone: string, diagnostic: string, mobile?: string, nationalId?: string, notes?: string): Promise<IUser> {
        return await User.create({ name, phone, diagnostic, mobile, nationalId, notes });
    }

    // Method to update user.
    static async updateUser(id: string, name: string, nationalId: string, notes?: string): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, { name, nationalId, notes }, { new: true });
    }

    // Method to delete user.
    static async deleteUser(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id);
    }
}

export default UserService;