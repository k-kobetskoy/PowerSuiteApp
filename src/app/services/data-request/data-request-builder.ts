import { Observable, Subject, Subscription, of, takeUntil } from "rxjs";
import { IDataRequestBuilder } from "./Idata-request-builder";
import { DestroyRef, inject } from "@angular/core";
import { LoadingIndicationService } from "../loading-indication.service";
import { DataRequestStates } from "./data-request-states.enum";
import { IDataStorageService } from "../data-sorage/Idata-storage-service";

export class DataRequestBuiler<T> implements IDataRequestBuilder<T> {
    private _destroyRef = inject(DestroyRef);
    private _destroyed = new Subject();

    protected data: T
    protected sub: Subscription
    protected httpRequest: boolean = false
    protected state = DataRequestStates.initial

    protected loadingIndicatorService = inject(LoadingIndicationService)
    protected dataStorageService: IDataStorageService

    constructor(protected requestFuncion?: () => Observable<T>, protected key?: string) {
        this._destroyRef.onDestroy(() => {
            this._destroyed.next(undefined);
            this._destroyed.complete();
        })
    }

    setDataStorage(dataStorageService: IDataStorageService): void {
        this.dataStorageService = dataStorageService
    }

    getFromCache(): void {
        if (this.data) {
            this.state = DataRequestStates.complete
            return
        }
        this.data = this.dataStorageService.getItem(this.key)
        return
    }

    getFromHttp(): void {
        if (this.data) {
            this.state = DataRequestStates.complete
            return
        }
        this.sub = this.requestFuncion()
            .pipe(takeUntil(this._destroyed))
            .subscribe(result => this.data = result)

        this.loadingIndicatorService.showLoaderUntilComplete(this.sub)
        this.httpRequest = true
        this.state = DataRequestStates.complete
        return
    }

    storeResult(): void {
        if (!this.httpRequest) return

        this.sub.add(() => this.storeItem())
        return
    }

    storeItem(): void {
        this.dataStorageService.setItem(this.data, this.key)
        this.state = DataRequestStates.complete
        return
    }

    getResult(funcs: Array<() => void>): Observable<T> {

        for (let func of funcs) {
            if (this.state === DataRequestStates.complete) {
                break
            }
            func()
        }
        this.state = DataRequestStates.initial
        return of(this.data)
    }

    set(funcs: Array<() => void>, item: T): void {
        this.data = item
        for (let func of funcs) {
            if (this.state === DataRequestStates.complete) {
                break
            }
            func()
        }
        this.state = DataRequestStates.initial
        return
    }
}

