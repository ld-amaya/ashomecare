/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { inject, injectable } from "inversify";
import { UserInfo, UserDetails } from "../models/User";
import { IUserManager } from "./IUserManager";
import { IUserStorageProvider } from "./providers/IUserStorageProvider";
import { UserSymbols } from "../models/UserSymbols";

@injectable()
export class UserManager implements IUserManager {
    private _provider: IUserStorageProvider;
    private env: string = 'local';

    constructor(
        @inject(UserSymbols.UserStorageFactory) protected _storageProvider: (env: string) => IUserStorageProvider
    ) {
        this._provider = _storageProvider(this.env);
    }
    
    async getUsers(): Promise<UserInfo[]> {
        return await this._provider.getUsers();
    }

    async getUserDetail(id: string): Promise<UserDetails> {
        return await this._provider.getUserDetails(id);
    }

    async addUser(userDetails: UserDetails): Promise<boolean> {
        return await this._provider.addUser(userDetails);
    }

    async updateUser(userDetails: UserDetails): Promise<boolean> {
        return await this._provider.updateUser(userDetails);
    }

    async deleteUser(userInfo: UserInfo): Promise<boolean> {
        return await this._provider.deleteUser(userInfo);
    }

}