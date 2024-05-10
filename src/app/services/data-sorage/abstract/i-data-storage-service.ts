import { BehaviorSubject } from "rxjs"

export interface IDataStorageService {
    getItem<T>(key: string): T |BehaviorSubject<T>| null
    setItem<T>(item: T, key: string): void
    removeItem(key: string): void
    clear(): void
}
