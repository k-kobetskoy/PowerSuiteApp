import { Injectable, inject } from "@angular/core";
import { IDataStorageService } from "../../data-sorage/abstract/i-data-storage-service";
import { IStoreRequestProcessor } from "./i-store-request-processor";
import { BehaviorSubject, Observable } from "rxjs";
import { CacheStorageService } from "../../data-sorage/cache-storage.service";

@Injectable({ providedIn: 'root' })
export abstract class BaseStoreRequestProcessor<T, D extends IDataStorageService> implements IStoreRequestProcessor<T, D> {

    cacheService = inject(CacheStorageService)
    
    constructor(protected dataStorageService: IDataStorageService) { }

    abstract get(key: string): Observable<T>
    abstract remove(key: string): void
    abstract store(item: T, key: string): void
    protected executeAdditionalLogic():void{
        return
    }
}
