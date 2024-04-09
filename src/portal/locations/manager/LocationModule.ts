/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import "reflect-metadata"
import { ContainerModule, interfaces } from "inversify";
import { container } from "../../../inversify/config"
import { LocationSymbols } from "../models/LocationSymbols";
import { ILocationManager } from "./ILocationManager";
import { LocationManager } from "./LocationManager";
import { IStorageProvider } from "./providers/IStorageProvider";
import { LocalProvider } from "./providers/LocalProvider";
import { ServiceProvider } from "./providers/ServiceProvider";

let _locationManager: ILocationManager;

export const LocationModule = new ContainerModule((bind) => {
    console.log("*** Binding Locations")
    bind<LocationManager>(LocationSymbols.LocationManager).to(LocationManager).inSingletonScope();

    bind<IStorageProvider>(LocationSymbols.LocationStorageProvider).to(LocalProvider).whenTargetNamed('local');
    bind<IStorageProvider>(LocationSymbols.LocationStorageProvider).to(ServiceProvider).whenTargetNamed('live');

    // Implement Factory Strategy
    bind<interfaces.Factory<IStorageProvider>>(LocationSymbols.LocationStorageFactory).toFactory((context) => (env: string) => {
        return context.container.getNamed<IStorageProvider>(LocationSymbols.LocationStorageProvider, env);
    });
});

const useLocationManager = (): ILocationManager => {
    return container.get(LocationSymbols.LocationManager) || _locationManager;
}

export { useLocationManager } 