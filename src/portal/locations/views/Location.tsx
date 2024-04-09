/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLocationManager } from "../manager/LocationModule";
import { LocationDetails } from "../models/location";
import { useLocationContext } from "../LocationContext";

export const Location = () => {
    const { locationId, setLocationId } = useLocationContext();
    const [location, setLocation] = useState<LocationDetails>(undefined);
    
    const locationManager = useLocationManager();
    const pathManager = useLocation();
    
    useEffect(() => {
        const urlPaths = pathManager.pathname.split('/');
        const locIndex = urlPaths.findIndex(path => path === 'location');
        if(locIndex > -1) setLocationId(urlPaths[locIndex + 1]);
    }, [])

    useEffect(() => {
        if (!locationId) return;
        getLocationDetails();
    }, [locationId])

    const getLocationDetails = async () => {
        const loc = await locationManager.getLocationDetails(locationId);
        if(loc) setLocation(loc);
    }

    return (
        <div className="flex">
            { location?.info?.name }
        </div>
    )
}