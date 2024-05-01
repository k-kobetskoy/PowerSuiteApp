import { Observable } from "rxjs";
import { IDataStorageService } from "../data-sorage/abstract/i-data-storage-service";
import { BaseStoreRequestProcessor } from "./abstract/base-store-request-processor";

export class StoreRequestProcessor<T, D extends IDataStorageService> extends BaseStoreRequestProcessor<T, D> {

    override store(item: T, key: string): void {
        this.subject$.next(item)
        this.dataStorageService.setItem<T>(item, key)
        this.executeAdditionalLogic()
        return
    }

    override get(key: string): Observable<T> {
        if (this.subject$.value) return this.subject$.asObservable()

        this.subject$.next(this.dataStorageService.getItem<T>(key))
        return this.subject$.asObservable()
    }

    override remove(key: string): void {
        this.subject$.next(null)
        this.dataStorageService.removeItem(key)
    }
}
