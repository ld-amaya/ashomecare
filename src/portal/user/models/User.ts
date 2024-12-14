/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Address } from "../../../models/Address";

export type UserType = 'client' | 'landlord' | 'user' | 'caseManager' | string;

export interface UserInfoModel {
    id: string;
    firstName: string;
    lastName: string;
    type: UserType;
    position?: string;
    email?: string;
    mobile?: string;
    createDate?: Date;
    createdBy?: string;
    modifiedDate?: Date;
    modifiedBy?: string;
    status?: string;
}
export class UserInfo implements UserInfoModel {
    id: string;
    firstName: string;
    lastName: string;
    type: UserType;
    position?: string;
    email?: string;
    mobile?: string;
    createDate?: Date;
    createdBy?: string;
    modifiedDate?: Date;
    modifiedBy?: string;
    status?: string;

    constructor(model: UserInfoModel) {
        this.id = model.id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.type = model.type;
        this.position = model?.position ?? '';
        this.email = model?.email ?? '';
        this.mobile = model?.mobile ?? '';
        this.createDate = model.createDate ?? new Date();
        this.createdBy = model.createdBy ?? '';
        this.modifiedDate = model.modifiedDate ?? new Date();
        this.modifiedBy = model?.modifiedBy ?? '';
        this.status = model?.status ?? '';
    }
    
}

export interface UserDetails {
    info: UserInfo;
    address?: Address
}