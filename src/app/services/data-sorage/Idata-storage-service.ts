export interface IDataStorageService {
    getItem<T>(key: string): T | null
    setItem<T>(item: T, key: string): void
    removeItem(key: string): void
    clear(): void
}
