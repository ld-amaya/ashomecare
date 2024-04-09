/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import "reflect-metadata";
import { Container, ContainerModule } from "inversify";

export const container = new Container();

export const loadModules = (...modules: ContainerModule[]) => {
    container.load(...modules.map(m => m))
}