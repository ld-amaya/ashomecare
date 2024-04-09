/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { LocationInfo, LocationDetails } from "../models/location";
import { ILocationManager } from "./ILocationManager";
import { IStorageProvider } from "./providers/IStorageProvider";
import { LocationSymbols } from "../models/LocationSymbols";

@injectable()
export class LocationManager implements ILocationManager {
    private _provider: IStorageProvider;
    private env: string = 'local';

    constructor(
        @inject(LocationSymbols.LocationStorageFactory) protected _storageProvider: (env: string) => IStorageProvider
    ) { 
        this._provider = _storageProvider(this.env);
    }

    getLocationList(): Promise<LocationInfo[]> {
        return Promise.resolve(this._provider.getLocationList());     
    }
    
    getLocationDetails(id: string): Promise<LocationDetails> {
        return Promise.resolve(this._provider.getLocationDetails(id));
    }
    
    addLocation(locationDetails: LocationDetails): Promise<boolean> {
        const result = this._provider.addLocation(locationDetails)
        return Promise.resolve(result);
    }

    updateLocation(locationDetails: LocationDetails): Promise<boolean> {
        return Promise.resolve(this._provider.updateLocation(locationDetails))
    }
    
    deleteLocation(info: LocationInfo): Promise<boolean> {
        return Promise.resolve(this._provider.deleteLocation(info))
    }
}
