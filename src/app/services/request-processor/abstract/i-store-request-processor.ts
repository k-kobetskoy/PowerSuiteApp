import { Observable } from "rxjs";
import { IDataStorageService } from "../../data-sorage/abstract/i-data-storage-service";

export interface IStoreRequestProcessor<T, D extends IDataStorageService> {
    store(item: T, key: string): void

    get(key: string): Observable<T>

    remove(key: string): void
}
