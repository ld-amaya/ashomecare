/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useResidenceManager } from "../manager/ResidenceModule";
import { ResidenceDetails } from "../models/Residence";
import { useResidenceContext } from "../ResidenceContext";

export const Residence = () => {
    const { residenceId, setResidenceId } = useResidenceContext();
    const [residence, setResidence] = useState<ResidenceDetails>(undefined);
    
    const residenceManager = useResidenceManager();
    const pathManager = useLocation();
    
    useEffect(() => {
        const urlPaths = pathManager.pathname.split('/');
        const locIndex = urlPaths.findIndex(path => path === 'residence');
        if(locIndex > -1) setResidenceId(urlPaths[locIndex + 1]);
    }, [])

    useEffect(() => {
			if (!residenceId) return;
			getResidenceDetails();
		}, [residenceId]);

    const getResidenceDetails = async () => {
        const loc = await residenceManager.getResidenceDetails(residenceId);
        if(loc) setResidence(loc);
    }

    return <div className='flex'>
        {residence?.info?.name}
    </div>;
}