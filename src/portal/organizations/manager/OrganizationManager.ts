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
        throw new Error(`Method not implemented for ${orgId}`);
    }
    addOrganization(orgDetails: OrganizationDetails): Promise<boolean> {
        throw new Error(`Method not implemented for ${JSON.stringify(orgDetails)}`);
    }
    updateOrganization(orgDetails: OrganizationDetails): Promise<boolean> {
        throw new Error(`Method not implemented for ${JSON.stringify(orgDetails)}`);
    }
    deleteOrganization(orgId: string): Promise<boolean> {
        throw new Error(`Method not implemented for ${orgId}`);
    }

}