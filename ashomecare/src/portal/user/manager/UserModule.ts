/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import "reflect-metadata"
import { ContainerModule, interfaces } from "inversify";
import { container } from "../../../inversify/config"
import { IUserManager } from "./IUserManager";
import { UserSymbols } from "../models/UserSymbols";
import { UserManager } from "./UserManager";
import { IUserStorageProvider } from "./providers/IUserStorageProvider";
import { ServiceProvider } from "./providers/ServiceProvider";
import { LocalProvider } from "./providers/LocalProvider";

let _userManager: IUserManager;

export const UserModule = new ContainerModule((bind) => {
    console.info("*** Binding Users");
    bind<IUserManager>(UserSymbols.UserManager).to(UserManager).inSingletonScope();

    bind<IUserStorageProvider>(UserSymbols.UserStorageProvider).to(LocalProvider).whenTargetNamed('local');
    bind<IUserStorageProvider>(UserSymbols.UserStorageProvider).to(ServiceProvider).whenTargetNamed('live');

    // Implement Factory Strategy
    bind<interfaces.Factory<IUserStorageProvider>>(UserSymbols.UserStorageFactory).toFactory((context) => (env: string) => {
        return context.container.getNamed<IUserStorageProvider>(UserSymbols.UserStorageProvider, env);
    });
});

const useUserManager = (): IUserManager => {
    return container.get(UserSymbols.UserManager) || _userManager;
}

export { useUserManager } 