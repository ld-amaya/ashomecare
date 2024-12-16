/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { Address } from "../../../models/Address";

export interface ResidenceInfo {
    id: string;
    name: string;
    address: Address;
    landline?: string;
    userId?: string;
}

export interface ResidenceDetails {
    info: ResidenceInfo;    
    wifi?: Wifi[];
}

export interface Wifi {
    provider: string;
    network: string;
    password: string;
}