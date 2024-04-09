/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */


import { UserDetails, UserInfo } from "../../models/User";


export interface IUserStorageProvider {
    getUsers(): Promise<UserInfo[]>;
    getUserDetails(id: string): Promise<UserDetails>;
    updateUser(userDetails: UserDetails): Promise<boolean>;
    addUser(userDetails: UserDetails): Promise<boolean>;
    deleteUser(userInfo: UserInfo): Promise<boolean>;
}