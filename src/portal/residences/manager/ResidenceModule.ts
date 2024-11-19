/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import "reflect-metadata"
import { ContainerModule, interfaces } from "inversify";
import { container } from "../../../inversify/config"
import { ResidenceSymbols } from "../models/ResidenceSymbols";
import { ResidenceManager } from "./ResidenceManager";
import { IStorageProvider } from "./providers/IStorageProvider";
import { LocalProvider } from "./providers/LocalProvider";
import { ServiceProvider } from "./providers/ServiceProvider";
import { IResidenceManager } from "./IResidenceManager";

export const ResidenceModule = new ContainerModule((bind) => {
    console.log("*** Binding Residences")
    bind<ResidenceManager>(ResidenceSymbols.ResidenceManager).to(ResidenceManager).inSingletonScope();

    bind<IStorageProvider>(ResidenceSymbols.ResidenceStorageProvider).to(LocalProvider).whenTargetNamed('local');
    bind<IStorageProvider>(ResidenceSymbols.ResidenceStorageProvider).to(ServiceProvider).whenTargetNamed('live');

    // Implement Factory Strategy
    bind<interfaces.Factory<IStorageProvider>>(ResidenceSymbols.ResidenceStorageFactory).toFactory((context) => (env: string) => {
        return context.container.getNamed<IStorageProvider>(ResidenceSymbols.ResidenceStorageProvider, env);
    });
});

let _residenceManager: IResidenceManager;

const useResidenceManager = (): IResidenceManager => {
    return container.get(ResidenceSymbols.ResidenceManager) || _residenceManager;
}

export { useResidenceManager } 