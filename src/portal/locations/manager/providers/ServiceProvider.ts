import "reflect-metadata";
import { injectable } from "inversify";
import { LocationInfo, LocationDetails } from "../../models/location";
import { IStorageProvider } from "./IStorageProvider";

/**
 * IMPLEMENT RESTUL ROUTE
 */
@injectable()
export class ServiceProvider implements IStorageProvider {
    
    async getLocationList(): Promise<LocationInfo[]> {
        throw new Error("Method not implemented.");
    }
    getLocationDetails(id: string): Promise<LocationDetails> {
        throw new Error("Method not implemented.");
    }
    addLocation(locationDetails: LocationDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateLocation(locationDetails: LocationDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteLocation(info: LocationInfo): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}