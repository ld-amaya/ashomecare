/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Address } from "../../../models/Address";

export type UserType = 'client' | 'landlord' | 'user' | 'clientManager' | string;

export interface UserInfo {
    id: string;
    firstName: string;
    lastName: string;
    position?: string;
    email?: string;
    mobile?: string;
    createDate?: Date;
    createdBy?: string;
    modifiedDate?: Date;
    modifiedBy?: string;
    type: UserType;
    status?: string;
}

export interface UserDetails {
    info: UserInfo;
    address?: Address
}