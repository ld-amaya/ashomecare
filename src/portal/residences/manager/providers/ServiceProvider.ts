import "reflect-metadata";
import { injectable } from "inversify";
import { ResidenceInfo, ResidenceDetails } from "../../models/Residence";
import { IStorageProvider } from "./IStorageProvider";

/**
 * IMPLEMENT RESTUL ROUTE
 */
@injectable()
export class ServiceProvider implements IStorageProvider {
    
    async getResidenceList(): Promise<ResidenceInfo[]> {
        throw new Error("Method not implemented.");
    }
    getResidenceDetails(id: string): Promise<ResidenceDetails> {
        throw new Error("Method not implemented.");
    }
    addResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    updateResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    deleteResidence(info: ResidenceInfo): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}