/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */
import { ResidenceDetails, ResidenceInfo } from "../models/Residence";

export interface IResidenceManager {
    getResidenceList(): Promise<ResidenceInfo[]>
    getResidenceDetails(id: string): Promise<ResidenceDetails>
    addResidence(residenceDetails: ResidenceDetails): Promise<boolean>
    updateResidence(residenceDetails: ResidenceDetails): Promise<boolean>
    deleteResidence(residenceId: string): Promise<boolean>
}