import { Injectable } from "@angular/core"
import { IDataStorageService } from "./abstract/i-data-storage-service"

@Injectable({providedIn: 'root'})
export class SessionStorageService implements IDataStorageService {

    constructor() { }

    getItem<T>(key: string): T | null {
        let value = sessionStorage.getItem(key)
        return value === null ? null : JSON.parse(value)
    }

    setItem<T>(item: T, key: string): void {
        sessionStorage.setItem(key, JSON.stringify(item))
    }

    removeItem(key: string): void {
        sessionStorage.removeItem(key)
    }

    clear(): void {
        sessionStorage.clear()
    }
}
