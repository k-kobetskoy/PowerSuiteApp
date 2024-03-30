import { IBaseCache } from "./base-cache";

export class SessionStorageCache implements IBaseCache{
    setItem(url: string, data: string): void {
        sessionStorage.setItem(url, data)
    }
    getItem(url: string): string | null {
        return sessionStorage.getItem(url)
    }
    removeItem(url: string): void {
        sessionStorage.removeItem(url)
    }
    clear(): void {
        sessionStorage.clear()
    }
}
