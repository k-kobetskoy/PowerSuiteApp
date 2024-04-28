import { Observable } from "rxjs"
import { IDataStorageService } from "../data-sorage/Idata-storage-service"

export interface IDataRequestBuilder<T> {
    setDataStorage(dataStorageService: IDataStorageService): void
    getFromCache(): void
    getFromHttp(): void
    storeResult(): void
    storeItem(): void
    getResult(funcs: Array<() => void>): Observable<T>
    set(funcs: Array<() => void>, item: T): void
}
