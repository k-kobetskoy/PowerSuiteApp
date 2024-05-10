import { Observable, of } from "rxjs";
import { IDataStorageService } from "../data-sorage/abstract/i-data-storage-service";
import { BaseStoreRequestProcessor } from "./abstract/base-store-request-processor";

export class StoreRequestProcessor<T, D extends IDataStorageService> extends BaseStoreRequestProcessor<T, D> {

    override store(item: T, key: string): void {
        this.cacheService.setItem<T>(item, key)

        this.dataStorageService.setItem<T>(item, key)
        this.executeAdditionalLogic()
        return
    }

    override get(key: string): Observable<T> {

        let item$ = this.cacheService.getItem<T>(key)
        
        if (!item$.value) {
            item$.next(<T>this.dataStorageService.getItem<T>(key));           
        }
        return item$.asObservable();
    }

    override remove(key: string): void {
        this.cacheService.removeItem(key)
        this.dataStorageService.removeItem(key)
    }
}
