/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

export type UserType = 'client' | 'owner' | 'user' | string;

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    mobile?: string;
    createDate?: Date;
    createdBy?: string;
    modifiedDate?: Date;
    modifiedBy?: string;
    type: UserType
}