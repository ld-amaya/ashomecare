/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Address } from "../../../models/Address";
import { User } from "../../../models/User";

export interface LocationInfo {
    id: string;
    name: string;
    address: Address;
    landline: string;
}

export interface LocationDetails {
    info: LocationInfo;
    owner: User;
    wifi?: {
        provider: string;
        network: string;
        password: string;
    }
}