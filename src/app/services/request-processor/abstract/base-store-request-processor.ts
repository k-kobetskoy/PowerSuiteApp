import { Injectable } from "@angular/core";
import { IDataStorageService } from "../../data-sorage/abstract/i-data-storage-service";
import { IStoreRequestProcessor } from "./i-store-request-processor";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export abstract class BaseStoreRequestProcessor<T, D extends IDataStorageService> implements IStoreRequestProcessor<T, D> {

    protected subject$: BehaviorSubject<T> = new BehaviorSubject<T>(null)
    
    constructor(protected dataStorageService: IDataStorageService) { }

    abstract get(key: string): Observable<T>
    abstract remove(key: string): void
    abstract store(item: T, key: string): void
    protected executeAdditionalLogic():void{
        return
    }
}
