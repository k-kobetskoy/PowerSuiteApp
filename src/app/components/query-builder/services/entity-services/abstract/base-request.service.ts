import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ACTIVE_ENVIRONMENT_URL } from 'src/app/models/tokens';
import { CacheStorageService } from 'src/app/services/data-sorage/cache-storage.service';
import { EnvironmentEntityService } from '../environment-entity.service';

@Injectable({ providedIn: 'root' })
export abstract class BaseRequestService {

    protected activeEnvironmentUrl$: Observable<string>;
    
    protected httpClient: HttpClient = inject(HttpClient);
    protected cacheService: CacheStorageService = inject(CacheStorageService);
    protected environmentService: EnvironmentEntityService = inject(EnvironmentEntityService);
    protected activeEnvironmentUrlSubject$: BehaviorSubject<string> = inject(ACTIVE_ENVIRONMENT_URL);

    constructor() { }
    
    protected getActiveEnvironmentUrl() {
        if (this.activeEnvironmentUrlSubject$?.value) {
            this.activeEnvironmentUrl$ = this.activeEnvironmentUrlSubject$.asObservable();
            return;
        }

        this.activeEnvironmentUrl$ = this.environmentService.getActiveEnvironment().pipe(map(env => env?.apiUrl));
    }
}
