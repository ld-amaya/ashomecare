/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { container } from "../../../inversify/config"
import { INavigationManager } from "./INavigationManager";
import { NavSymbols } from "../models/NavSymbols";

let _navManager: INavigationManager;

const useNavigationManager = (): INavigationManager => {
    return container.get(NavSymbols.NavigationManager) || _navManager;
}

export { useNavigationManager } 