import { Injectable } from "@angular/core";
import { IDataStorageService } from "./abstract/i-data-storage-service";

@Injectable({ providedIn: 'root' })
export class LocalStorageService implements IDataStorageService {

    constructor() { }

    getItem<T>(key: string): T | null {
        let value = localStorage.getItem(key)

        if (value) return JSON.parse(value)

        return null
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
