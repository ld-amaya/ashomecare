/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { ResidenceDetails, ResidenceInfo } from "../../models/ResidenceDetails"

export interface IStorageProvider {
    getResidenceList(): Promise<ResidenceInfo[]>
    getResidenceDetails(id: string): Promise<ResidenceDetails>
    addResidence(ResidenceDetails: ResidenceDetails): Promise<boolean>
    updateResidence(ResidenceDetails: ResidenceDetails): Promise<boolean>
    deleteResidence(residenceId: string): Promise<boolean>
}