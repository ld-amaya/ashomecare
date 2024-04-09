/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { UserDetails, UserInfo } from "../models/User";

export interface IUserManager {
    getUsers(): Promise<UserInfo[]>;
    getUserDetail(id: string): Promise<UserDetails>;
    addUser(userDetails: UserDetails): Promise<boolean>;
    updateUser(userDetails: UserDetails): Promise<boolean>;
    deleteUser(userInfo: UserInfo): Promise<boolean>;
}