/**
 * Copyright 2024 Lou Amaya - All Rights Reserved
 */
import "reflect-metadata";
import { injectable } from "inversify";
import { IUserStorageProvider } from "./IUserStorageProvider";
import { UserInfo, UserDetails } from "../../models/User";

@injectable()
export class LocalProvider implements IUserStorageProvider {
    private _storage = window.localStorage;
    private _users: UserDetails[] = [];
    private LOC_KEY = 'Users';


    getUsers(): Promise<UserInfo[]> {
        console.log("*** RUNNING ON LOCAL STORAGE");
        const infoString = this._storage.getItem(this.LOC_KEY);

        const infoArray = JSON.parse(infoString);

        return infoArray?.map(details => {
            const userDetails: UserDetails = JSON.parse(details);
            return userDetails.info;
        })
    }

    getUserDetails(id: string): Promise<UserDetails> {
        this._users = this.get();
        return Promise.resolve(this._users?.find(loc => loc.info.id === id));
    }

    updateUser(userDetails: UserDetails): Promise<boolean> {
        this._users = this.get();
        const idx = this._users?.findIndex(loc => loc.info.id === userDetails.info.id);
        if (idx > -1) {
            this._users[idx] = userDetails;
            this.set();
            return Promise.resolve(true);
        }
        return Promise.resolve(this.addUser(userDetails));
    }

    addUser(userDetails: UserDetails): Promise<boolean> {
        this._users = this.get();
        this._users.push(userDetails);

        this.set();

        return Promise.resolve(true);
    }

    deleteUser(userInfo: UserInfo): Promise<boolean> {
        this._users = this.get();
        const idx = this._users?.findIndex(loc => loc.info.id === userInfo.id);
        if (idx > -1) {
            this._users.splice(idx, 1);
            this.set();

            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
    
    private get() {
        const userArray = JSON.parse(this._storage.getItem(this.LOC_KEY));
        return userArray?.map(u => JSON.parse(u)) || [];
    }

    private set() {
        this._storage.setItem(this.LOC_KEY, JSON.stringify(this._users.map(loc => JSON.stringify(loc))));
    }
}