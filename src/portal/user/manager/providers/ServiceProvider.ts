import { UserInfo, UserDetails } from "../../models/User";
import { IUserStorageProvider } from "./IUserStorageProvider";

export class ServiceProvider implements IUserStorageProvider {
    getUsers(): Promise<UserInfo[]> {
        throw new Error("Method not implemented.");
    }
    getUserDetails(id: string): Promise<UserDetails> {
        throw new Error(`Method not implemented of: ${id} `);
    }
    updateUser(userDetails: UserDetails): Promise<boolean> {
        throw new Error(`Method not implemented. ${userDetails.info.id}`);
    }
    addUser(userDetails: UserDetails): Promise<boolean> {
        throw new Error(`Method not implemented. ${userDetails.info.id}`);
    }
    deleteUser(userInfo: UserInfo): Promise<boolean> {
        throw new Error(`Method not implement for ${userInfo.id}`);
    }

}