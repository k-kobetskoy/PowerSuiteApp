import { Observable, Subscription } from "rxjs";
import { IGetRequestProcessor } from "./i-get-request-processor";
import { Injectable, OnDestroy, inject } from "@angular/core";
import { LoadingIndicationService } from "../../../components/loading-indicator/services/loading-indication.service";
import { CacheStorageService } from "../../data-sorage/cache-storage.service";


@Injectable({ providedIn: 'root' })
export abstract class BaseGetRequestProcessor<T> implements IGetRequestProcessor<T>, OnDestroy {

    protected subscription: Subscription
    
    protected loadingIndicatorService = inject(LoadingIndicationService)
    protected cacheService = inject(CacheStorageService)

    protected httpGet(requestFunction: () => Observable<T>, key: string): void {        
        this.subscription = requestFunction()
            .subscribe(data => {                
                this.cacheService.setItem<T>(data, key)
            })

        this.loadingIndicatorService.showLoaderUntilComplete(this.subscription)
    }

    abstract get(key: string, requestFunction?: () => Observable<T>): Observable<T>

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
