/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */
import { LocationDetails, LocationInfo } from "../models/location";

export interface ILocationManager {
    getLocationList(): Promise<LocationInfo[]>
    getLocationDetails(id: string): Promise<LocationDetails>
    addLocation(locationDetails: LocationDetails): Promise<boolean>
    updateLocation(locationDetails: LocationDetails): Promise<boolean>
    deleteLocation(info: LocationInfo): Promise<boolean>
}