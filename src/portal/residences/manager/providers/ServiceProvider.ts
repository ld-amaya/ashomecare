import "reflect-metadata";
import { injectable } from "inversify";
import { ResidenceInfo, ResidenceDetails } from "../../models/ResidenceDetails";
import { IStorageProvider } from "./IStorageProvider";

/**
 * IMPLEMENT RESTUL ROUTE
 */
@injectable()
export class ServiceProvider implements IStorageProvider {
    
    async getResidenceList(): Promise<ResidenceInfo[]> {
        throw new Error("Method not implemented.");
    }
    getResidenceDetails(residenceId: string): Promise<ResidenceDetails> {
        throw new Error(`Method not implemented for ${residenceId}`);
    }
    addResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        throw new Error(`Method not implemented for residence details ${JSON.stringify(residenceDetails)}`);
    }
    updateResidence(residenceDetails: ResidenceDetails): Promise<boolean> {
        throw new Error(`Method not implemented for residence details ${JSON.stringify(residenceDetails)}`);
    }
    deleteResidence(residenceId: string): Promise<boolean> {
        throw new Error(`Method not implemented for ${residenceId}`);
    }
}