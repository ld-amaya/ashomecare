import { UserInfo, UserDetails } from "../../models/User";
import { IUserStorageProvider } from "./IUserStorageProvider";

export class ServiceProvider implements IUserStorageProvider {
    getUsers(): Promise<UserInfo[]> {
        throw new Error("Method not implemented.");
    }
    getUserDetails(id: string): Promise<UserDetails> {
        throw new Error("Method not implemented.");
    }
    updateUser(userDetails: UserDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    addUser(userDetails: UserDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteUser(userInfo: UserInfo): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}