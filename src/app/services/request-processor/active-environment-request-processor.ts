import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { LocalStorageService } from "../data-sorage/local-storage.service";
import { EnvironmentModel } from "src/app/models/environment-model";
import { CacheKeys } from "src/app/config/cache-keys";
import { Constants } from "src/app/config/constants";
import { IDataStorageService } from "../data-sorage/abstract/i-data-storage-service";
import { StoreRequestProcessor } from "./store-request-processor";
import { Observable } from "rxjs";

export class ActiveEnvironmentRequestProcessor<T extends EnvironmentModel, D extends IDataStorageService> extends StoreRequestProcessor<T, D> {

    private _authService = inject(AuthService)
    private _localStorageService = inject(LocalStorageService)

    override executeAdditionalLogic(): void {
        let activeEnvironment = this.cacheService.getItem<T>(CacheKeys.ActiveEnvironment)?.value

        this._authService.addProtectedResourceToInterceptorConfig(activeEnvironment.apiUrl)

        let environments = this._localStorageService.getItem<T[]>(CacheKeys.RecentActiveEnvironments)

        if (environments) {
            const arrayLength = environments.length

            arrayLength < Constants.MaxRecentActiveEnvironments ? environments.unshift(activeEnvironment) : environments.splice(0, 1, activeEnvironment)

            this._localStorageService.setItem<T[]>(environments, CacheKeys.RecentActiveEnvironments)
        }

        this._localStorageService.setItem<T[]>([activeEnvironment], CacheKeys.RecentActiveEnvironments)
    }

    override get(key: string): Observable<T> {

        let activeEnvironment$ = this.cacheService.getItem<T>(key)

        if (!activeEnvironment$.value) {
            let activeEnvironment = <T>this.dataStorageService.getItem<T>(key)
            
            if (activeEnvironment) {
                activeEnvironment$.next(activeEnvironment)
            }
        }

        if (!activeEnvironment$.value) {
            let activeEnvironment = this._localStorageService.getItem<T[]>(CacheKeys.RecentActiveEnvironments)?.length > 0
                ? <T>this._localStorageService.getItem<T[]>(CacheKeys.RecentActiveEnvironments)[0]
                : null

            if (activeEnvironment) {
                activeEnvironment$.next(activeEnvironment)
            }
        }

        return activeEnvironment$.asObservable();
    }
}
