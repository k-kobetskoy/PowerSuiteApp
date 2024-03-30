import { IBaseCache } from "./base-cache";

export class LocalStorageCache implements IBaseCache {
    setItem(url: string, data: string): void {
        localStorage.setItem(url, data)
    }
    getItem(url: string): string | null {
        return localStorage.getItem(url)
    }
    removeItem(url: string): void {
        localStorage.removeItem(url)
    }
    clear(): void {
        localStorage.clear()
    }
}
