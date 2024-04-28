import { inject } from "@angular/core";
import { DataRequestBuiler } from "../data-request-builder";
import { AuthService } from "../../auth.service";
import { LocalStorageService } from "../../data-sorage/local-storage.service";
import { SessionStorageService } from "../../data-sorage/session-storage.service";
import { UserEnvironmentModel } from "src/app/models/user-environment-model";
import { CacheKeys } from "src/app/config/cache-keys";
import { Constants } from "src/app/config/constants";

export class SetActiveEnvironmentRequestBuilder<T extends UserEnvironmentModel> extends DataRequestBuiler<T> {

    private _authService = inject(AuthService)
    private _localStorageService = inject(LocalStorageService)
    private _sessionStorageServcie = inject(SessionStorageService)

    override storeItem(): void {
        this._authService.addProtectedResourceToInterceptorConfig(`${this.data.apiUrl}/api/data/v9.2/`, [`${this.data.apiUrl}/user_impersonation`])

        this._sessionStorageServcie.setItem<T>(this.data, this.key)

        let envs = this._localStorageService.getItem<T[]>(CacheKeys.RecentActiveEnvironments)

        if (envs) {
            const arrayLength = envs.length
            
            arrayLength < Constants.MaxRecentActiveEnvironments ? envs.unshift(this.data) : envs.splice(0, 1, this.data)
            
            this._localStorageService.setItem<T[]>(envs, CacheKeys.RecentActiveEnvironments)
        }

        this._localStorageService.setItem<T[]>([this.data], CacheKeys.RecentActiveEnvironments)        
    }
}
