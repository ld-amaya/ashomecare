/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */

import { injectable } from "inversify";
import { ILocalStorage } from "./ILocalStorage";

@injectable()
export class LocalStorage implements ILocalStorage {

    private _storage = window.localStorage;

    get(key: string): any {
        const data = this._storage.getItem(key)
        return this.deserialize(data);
    }

    set(key: string, data: any): void {
        const serializedString = this.serialize(data);
        this._storage.setItem(key, serializedString);
    }

    delete(key: string): void {
        this._storage.removeItem(key);
    }

    private serialize(data) {
        return JSON.stringify(data)
    }

    private deserialize(data): any {
        return JSON.parse(data)
    }
}