/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { ContainerModule, interfaces } from "inversify";
import { container } from "../../../inversify/config"
import { LocationSymbols } from "../models/LocationSymbols";
// import * as inversify from "inversify";
import { ILocationManager } from "./ILocationManager";
import { LocationManager } from "./LocationManager";
import { IStorageProvider } from "./providers/IStorageProvider";
import { LocalProvider } from "./providers/LocalProvider";
import { ServiceProvider } from "./providers/ServiceProvider";

let _locationManager: ILocationManager;


container.bind<LocationManager>(LocationSymbols.LocationManager).to(LocationManager).inSingletonScope();

container.bind<IStorageProvider>(LocationSymbols.StorageProvider).to(LocalProvider).whenTargetNamed('local');
container.bind<IStorageProvider>(LocationSymbols.StorageProvider).to(ServiceProvider).whenTargetNamed('live');

// Implement Factory Strategy
container.bind<interfaces.Factory<IStorageProvider>>(LocationSymbols.StorageFactory).toFactory<IStorageProvider>((context) => (env: string) => {
    return context.container.getNamed<IStorageProvider>(LocationSymbols.StorageProvider, env);
});
        

const useLocationManager = (): ILocationManager => {
    return container.get(LocationSymbols.LocationManager) || _locationManager;
}

export { useLocationManager } 