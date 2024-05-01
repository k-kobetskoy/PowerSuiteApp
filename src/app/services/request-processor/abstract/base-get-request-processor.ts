import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { IGetRequestProcessor } from "./i-get-request-processor";
import { Injectable, OnDestroy, inject } from "@angular/core";
import { LoadingIndicationService } from "../../loading-indication.service";


@Injectable({ providedIn: 'root' })
export abstract class BaseGetRequestProcessor<T> implements IGetRequestProcessor<T>, OnDestroy {

    protected subject$: BehaviorSubject<T> = new BehaviorSubject<T>(null)
    protected subscription: Subscription

    protected loadingIndicatorService = inject(LoadingIndicationService)

    protected httpGet(requestFuncion: () => Observable<T>): void {
        this.subscription = requestFuncion()
            .subscribe(data => {
                console.warn('BaseGetRequestProcessor : httpGet')
                this.subject$.next(data)
            })

        this.loadingIndicatorService.showLoaderUntilComplete(this.subscription)
    }

    abstract get(requestFuncion?: () => Observable<T>): Observable<T>

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }
}
