/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */
import "reflect-metadata";
import { injectable } from "inversify";
import { LocationInfo, LocationDetails } from "../../models/location";
import { IStorageProvider } from "./IStorageProvider";

@injectable()
export class LocalProvider implements IStorageProvider {
    private _storage = window.localStorage;
    private _locations: LocationDetails[] = [];
    private LOC_KEY = 'locations';

    getLocationList(): Promise<LocationInfo[]> {
        const infoString = this._storage.getItem(this.LOC_KEY);
        
        const infoArray = JSON.parse(infoString);
        console.log("*** RUNNING ON LOCAL STORAGE");

        return infoArray?.map(details => {
            const locDetails: LocationDetails = JSON.parse(details);
            return locDetails.info;
        })
    }

    getLocationDetails(info: LocationInfo): Promise<LocationDetails> {
        return Promise.resolve(this._locations.find(loc => loc.info.id === info.id));
    }

    addLocation(locationDetails: LocationDetails): Promise<boolean> {
        this._locations.push(locationDetails);
        this._storage.setItem(this.LOC_KEY, JSON.stringify(this._locations.map(loc => JSON.stringify(loc))));

        return Promise.resolve(true);
    }

    updateLocation(locationDetails: LocationDetails): Promise<boolean> {
        const idx = this._locations.findIndex(loc => loc.info.id === locationDetails.info.id);
        if (idx > -1) {
            this._locations[idx] = locationDetails;
            const data = JSON.stringify(this._locations.map(loc => JSON.stringify(loc)));
            this._storage.setItem(this.LOC_KEY, data);
            return Promise.resolve(true);
        }
        return Promise.resolve(this.addLocation(locationDetails));
    }

    deleteLocation(info: LocationInfo): Promise<boolean> {
        const idx = this._locations.findIndex(loc => loc.info.id === info.id);
        if (idx > -1) {
            this._locations.splice(idx, 1);
            const data = JSON.stringify(this._locations.map(loc => JSON.stringify(loc)));
            this._storage.setItem(this.LOC_KEY, data);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    
}