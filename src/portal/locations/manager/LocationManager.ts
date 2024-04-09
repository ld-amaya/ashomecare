/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { LocationInfo, LocationDetails } from "../models/location";
import { ILocationManager } from "./ILocationManager";
import { LocationSymbols } from "../models/LocationSymbols";
import { IStorageProvider } from "./providers/IStorageProvider";

@injectable()
export class LocationManager implements ILocationManager {
    private _storage: IStorageProvider;
    private env: string = process.env.REACT_APP_STORAGE_ENV;

    constructor(
        @inject(LocationSymbols.StorageFactory) protected _storageProvider: (env: string) => IStorageProvider
    ) { 
        this._storage = _storageProvider(this.env);
    }

    getLocationList(): Promise<LocationInfo[]> {
        return Promise.resolve(this._storage.getLocationList());     
    }
    
    getLocationDetails(info: LocationInfo): Promise<LocationDetails> {
        throw new Error("Method not implemented.");
    }
    
    addLocation(locationDetails: LocationDetails): Promise<boolean> {
        const result = this._storage.addLocation(locationDetails)
        return Promise.resolve(result);
    }

    updateLocation(locationDetails: LocationDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    deleteLocation(info: LocationInfo): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
