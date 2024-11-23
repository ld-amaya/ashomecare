/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ResidenceInfo, ResidenceDetails } from "../../models/Residence";
import { IStorageProvider } from "./IStorageProvider";
import { LocalStorage } from "../../../../environment/LocalStorage";
import { ILocalStorage } from "../../../../environment/ILocalStorage";

@injectable()
export class LocalProvider implements IStorageProvider {
    private _residences: ResidenceDetails[] = [];
    private LOC_KEY = 'residences';

    constructor(
        @inject <ILocalStorage>(LocalStorage) private _storage:ILocalStorage 
    ) {

    }
    getResidenceList(): Promise<ResidenceInfo[]> {
        console.log("*** RUNNING ON ResidenceS LOCAL STORAGE");
        const data = this._storage.get(this.LOC_KEY);

        return data?.map(details => {
            return details.info;
        })
    }

    getResidenceDetails(id: string): Promise<ResidenceDetails> {
        this._residences = this._storage.get(this.LOC_KEY);
        return Promise.resolve(this._residences?.find(loc => loc.info.id === id));
    }

    addResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        this._residences = this._storage.get(this.LOC_KEY);
        this._residences.push(residenceDetails);
        this._storage.set(this.LOC_KEY, this._residences);

        return Promise.resolve(true);
    }

    updateResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        this._residences = this._storage.get(this.LOC_KEY);
        const idx = this._residences?.findIndex(loc => loc.info.id === residenceDetails.info.id);

        if (idx > -1) {
            this._residences[idx] = residenceDetails;
            this._storage.set(this.LOC_KEY, this._residences);
            return Promise.resolve(true);
        }
        return Promise.resolve(this.addResidence(residenceDetails));
    }

    deleteResidence(residenceId: string): Promise<boolean> {
        this._residences = this._storage.get(this.LOC_KEY);

        const idx = this._residences?.findIndex(loc => loc.info.id === residenceId);
        
        if (idx > -1) {
            this._residences.splice(idx, 1);
            this._storage.set(this.LOC_KEY, this._residences);
            return Promise.resolve(true);
        }

        this._storage.set(this.LOC_KEY, this._residences);
        return Promise.resolve(false);
    }
}