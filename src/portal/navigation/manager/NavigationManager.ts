/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { injectable } from "inversify";
import { INavigationManager } from "./INavigationManager";

@injectable()
export class NavigationManager implements INavigationManager {
    
    constructor() {}


    navigateTo(target: string): void {
        console.log("*** Navigating to: ", target);
    }
}