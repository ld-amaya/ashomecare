/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import "reflect-metadata";
import { injectable } from "inversify";
import { OrganizationDetails } from "../../models/OrganizationDetails";
import { OrganizationInfo } from "../../models/OrganizationInfo";
import { IOrgStorageProvider } from "./IOrgStorageProvider";

@injectable()
export class ServiceOrgProvider implements IOrgStorageProvider {
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
        throw new Error(`Method not implemented for ${JSON.stringify(orgDetails) }`);
    }
    deleteOrganization(orgId: string): Promise<boolean> {
        throw new Error(`Method not implemented for ${orgId}`);
    }

}
