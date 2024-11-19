/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { ContainerModule } from "inversify";
import { ILocalStorage } from "./ILocalStorage";
import { LocalStorage } from "./LocalStorage";

export const StorageModule = new ContainerModule((bind) => {
    console.log("*** Binding Storage")
    bind<ILocalStorage>(LocalStorage).to(LocalStorage).inSingletonScope();
});