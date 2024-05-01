import { inject } from "@angular/core";
import { AuthService } from "../auth.service";
import { LocalStorageService } from "../data-sorage/local-storage.service";
import { EnvironmentModel } from "src/app/models/environment-model";
import { CacheKeys } from "src/app/config/cache-keys";
import { Constants } from "src/app/config/constants";
import { IDataStorageService } from "../data-sorage/abstract/i-data-storage-service";
import { StoreRequestProcessor } from "./store-request-processor";

export class ActiveEnvironmentProcessor<T extends EnvironmentModel, D extends IDataStorageService> extends StoreRequestProcessor<T, D> {

    private _authService = inject(AuthService)
    private _localStorageService = inject(LocalStorageService)

    override executeAdditionalLogic(): void {
        let activeEnvironment = this.subject$.value
        this._authService.addProtectedResourceToInterceptorConfig(`${activeEnvironment.apiUrl}/api/data/v9.2/`, [`${activeEnvironment.apiUrl}/user_impersonation`])

        let environments = this._localStorageService.getItem<T[]>(CacheKeys.RecentActiveEnvironments)

        if (environments) {
            const arrayLength = environments.length

            arrayLength < Constants.MaxRecentActiveEnvironments ? environments.unshift(activeEnvironment) : environments.splice(0, 1, activeEnvironment)

            this._localStorageService.setItem<T[]>(environments, CacheKeys.RecentActiveEnvironments)
        }

        this._localStorageService.setItem<T[]>([activeEnvironment], CacheKeys.RecentActiveEnvironments)
    }
}
