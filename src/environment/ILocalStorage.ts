/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

export interface ILocalStorage {
    get(key: string): any;
    set(key: string, data: any): void;
    delete(key: string): void;
}