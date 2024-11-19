/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */
import "reflect-metadata";
import { injectable } from "inversify";
import { ResidenceInfo, ResidenceDetails } from "../../models/Residence";
import { IStorageProvider } from "./IStorageProvider";

@injectable()
export class LocalProvider implements IStorageProvider {
    private _storage = window.localStorage;
    private _residences: ResidenceDetails[] = [];
    private LOC_KEY = 'residences';

    getResidenceList(): Promise<ResidenceInfo[]> {
        console.log("*** RUNNING ON ResidenceS LOCAL STORAGE");
        const infoString = this._storage.getItem(this.LOC_KEY);
        
        const infoArray = JSON.parse(infoString);

        return infoArray?.map(details => {
            const locDetails: ResidenceDetails = JSON.parse(details);
            return locDetails.info;
        })
    }

    getResidenceDetails(id: string): Promise<ResidenceDetails> {
        this._residences = this.get();
        return Promise.resolve(this._residences?.find(loc => loc.info.id === id));
    }

    addResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        this._residences = this.get();
        this._residences.push(residenceDetails);
        this.set();

        return Promise.resolve(true);
    }

    updateResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        this._residences = this.get();
        const idx = this._residences?.findIndex(loc => loc.info.id === residenceDetails.info.id);

        if (idx > -1) {
            this._residences[idx] = residenceDetails;
            this.set();
            return Promise.resolve(true);
        }
        return Promise.resolve(this.addResidence(residenceDetails));
    }

    deleteResidence(info: ResidenceInfo): Promise<boolean> {
        this._residences = this.get();
        const idx = this._residences?.findIndex(loc => loc.info.id === info.id);
        if (idx > -1) {
            this._residences.splice(idx, 1);
            this.set();
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    private get() {
        const ResidenceArray = JSON.parse(this._storage.getItem(this.LOC_KEY));
        return ResidenceArray?.map(loc => JSON.parse(loc)) || [];
    }

    private set() {
        this._storage.setItem(this.LOC_KEY, JSON.stringify(this._residences.map(loc => JSON.stringify(loc))));
    }
    
}