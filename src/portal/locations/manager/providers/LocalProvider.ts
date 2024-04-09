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
    private LOC_KEY = 'Locations';

    getLocationList(): Promise<LocationInfo[]> {
        console.log("*** RUNNING ON LOCATIONS LOCAL STORAGE");
        const infoString = this._storage.getItem(this.LOC_KEY);
        
        const infoArray = JSON.parse(infoString);

        return infoArray?.map(details => {
            const locDetails: LocationDetails = JSON.parse(details);
            return locDetails.info;
        })
    }

    getLocationDetails(id: string): Promise<LocationDetails> {
        this._locations = this.get();
        return Promise.resolve(this._locations?.find(loc => loc.info.id === id));
    }

    addLocation(locationDetails: LocationDetails): Promise<boolean> {
        this._locations = this.get();
        this._locations.push(locationDetails);
        this.set();

        return Promise.resolve(true);
    }

    updateLocation(locationDetails: LocationDetails): Promise<boolean> {
        this._locations = this.get();
        const idx = this._locations?.findIndex(loc => loc.info.id === locationDetails.info.id);

        if (idx > -1) {
            this._locations[idx] = locationDetails;
            this.set();
            return Promise.resolve(true);
        }
        return Promise.resolve(this.addLocation(locationDetails));
    }

    deleteLocation(info: LocationInfo): Promise<boolean> {
        this._locations = this.get();
        const idx = this._locations?.findIndex(loc => loc.info.id === info.id);
        if (idx > -1) {
            this._locations.splice(idx, 1);
            this.set();
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    private get() {
        const locationArray = JSON.parse(this._storage.getItem(this.LOC_KEY));
        return locationArray?.map(loc => JSON.parse(loc)) || [];
    }

    private set() {
        this._storage.setItem(this.LOC_KEY, JSON.stringify(this._locations.map(loc => JSON.stringify(loc))));
    }
    
}