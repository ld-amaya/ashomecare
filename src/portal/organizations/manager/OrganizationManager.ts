/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { injectable } from "inversify";
import { OrganizationDetails } from "../models/OrganizationDetails";
import { OrganizationInfo } from "../models/OrganizationInfo";
import { IOrganizationManager } from "./IOrganizationManager";

@injectable()
export class OrgnizationManager implements IOrganizationManager {
    getOrganizations(): Promise<OrganizationInfo[]> {
        throw new Error("Method not implemented.");
    }
    getOrganizationDetails(orgId: string): Promise<OrganizationDetails> {
        throw new Error("Method not implemented.");
    }
    addOrganization(orgDetails: OrganizationDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateOrganization(orgDetails: OrganizationDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteOrganization(orgInfo: OrganizationInfo): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}