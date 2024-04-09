/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Address } from "../../../models/Address";

export interface OrganizationInfo {
    id: string;
    name: string;
    address?: Address
}