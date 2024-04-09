/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { UserInfo } from "../../user/models/User";
import { OrganizationInfo } from "./OrganizationInfo";

export interface OrganizationDetails {
    info: OrganizationInfo;
    employees: UserInfo[];
}