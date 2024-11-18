/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import "reflect-metadata";
import { ContainerModule, interfaces } from "inversify";
import { IOrganizationManager } from "./IOrganizationManager";
import { OrganizationSymbols } from "../models/OrganizationSymbols";
import { OrgnizationManager } from "./OrganizationManager";
import { IOrgStorageProvider } from "./providers/IOrgStorageProvider";
import { LocalOrgProvider } from "./providers/LocalOrgProvider";
import { ServiceOrgProvider } from "./providers/ServiceOrgProvider";
import { container } from "../../../inversify/config";

export const OrganizationModule = new ContainerModule((bind) => {
    console.log("*** Binding Organization Module");

    bind<IOrganizationManager>(OrganizationSymbols.OrganizationManager).to(OrgnizationManager).inSingletonScope();

    bind<IOrgStorageProvider>(OrganizationSymbols.OrganizationStorageProvider).to(LocalOrgProvider).whenTargetNamed('local');
    bind<IOrgStorageProvider>(OrganizationSymbols.OrganizationStorageProvider).to(ServiceOrgProvider).whenTargetNamed('live');

    bind<interfaces.Factory<IOrgStorageProvider>>(OrganizationSymbols.OrganizationStorageFactory).toFactory((context) => (env: string) => {
        return context.container.getNamed<IOrgStorageProvider>(OrganizationSymbols.OrganizationStorageProvider, env);
    })
});

export const useOrganizationManager = () => {
    return container.get(OrganizationSymbols.OrganizationManager) || new OrgnizationManager();
}