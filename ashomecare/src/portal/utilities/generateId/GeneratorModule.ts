/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { ContainerModule } from "inversify";
import { container } from "../../../inversify/config";
import { GenerateIdSymbols } from "./GenerateIdSymbols";
import { GeneratorManager } from "./GeneratorManager";
import { IGenerateId } from "./IGenerateId";
import { NanoidManager } from "./NanoidManager";

let _generateId: GeneratorManager;

export const GeneratorModule = new ContainerModule((bind) => {
    console.log("*** Binding Generators");
    bind<IGenerateId>(GenerateIdSymbols.UniqId).to(NanoidManager).inSingletonScope();
    bind(GeneratorManager).toSelf().inSingletonScope();
});

export const useIDGenerator = () => {
    return container.get(GeneratorManager) || _generateId;
}