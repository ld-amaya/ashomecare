/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Address } from "../../../models/Address";
import { UserInfo } from "../../user/models/User";

export interface LocationInfo {
    id: string;
    name: string;
    address: Address;
    landline?: string;
    userId?: string;
}

export interface LocationDetails {
    info: LocationInfo;
    wifi?: {
        provider: string;
        network: string;
        password: string;
    }
}