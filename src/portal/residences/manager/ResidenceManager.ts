/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { ResidenceInfo, ResidenceDetails } from "../models/Residence";
import { IStorageProvider } from "./providers/IStorageProvider";
import { ResidenceSymbols } from "../models/ResidenceSymbols";
import { IResidenceManager } from "./IResidenceManager";

@injectable()
export class ResidenceManager implements IResidenceManager {
    private _provider: IStorageProvider;
    private _env: string = import.meta.env.VITE_API_ENV;

    constructor(
        @inject(ResidenceSymbols.ResidenceStorageFactory) protected _storageProvider: (env: string) => IStorageProvider
    ) { 
        this._provider = _storageProvider(this._env);
    }

    getResidenceList(): Promise<ResidenceInfo[]> {
        return Promise.resolve(this._provider.getResidenceList());     
    }
    
    getResidenceDetails(id: string): Promise<ResidenceDetails> {
        return Promise.resolve(this._provider.getResidenceDetails(id));
    }
    
    addResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        const result = this._provider.addResidence(residenceDetails)
        return Promise.resolve(result);
    }

    updateResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        return Promise.resolve(this._provider.updateResidence(residenceDetails))
    }
    
    deleteResidence(residenceId: string): Promise<boolean> {
        return Promise.resolve(this._provider.deleteResidence(residenceId))
    }
}
