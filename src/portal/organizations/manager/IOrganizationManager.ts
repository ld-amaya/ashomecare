/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { OrganizationDetails } from "../models/OrganizationDetails";
import { OrganizationInfo } from "../models/OrganizationInfo";

export interface IOrganizationManager {
    getOrganizations(): Promise<OrganizationInfo[]>;
    getOrganizationDetails(orgId: string): Promise<OrganizationDetails>;
    addOrganization(orgDetails: OrganizationDetails): Promise<boolean>;
    updateOrganization(orgDetails: OrganizationDetails): Promise<boolean>;
    deleteOrganization(orgId: string): Promise<boolean>;
}