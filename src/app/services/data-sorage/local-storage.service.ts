import { Injectable } from "@angular/core";
import { IDataStorageService } from "./Idata-storage-service";

@Injectable({providedIn: 'root'})
export class LocalStorageService implements IDataStorageService {

    constructor() { }

    getItem<T>(key: string): T | null {
        let value = localStorage.getItem(key)
        return value === null ? null : JSON.parse(value)
    }

    setItem<T>(item: T, key: string): void {
        localStorage.setItem(key, JSON.stringify(item))
    }

    removeItem(key: string): void {
        localStorage.removeItem(key)
    }

    clear(): void {
        localStorage.clear()
    }
}
