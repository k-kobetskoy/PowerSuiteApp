import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CacheStorageService } from '../../data-sorage/cache-storage.service';
import { EnvironmentEntityService } from '../environment-entity.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ACTIVE_ENVIRONMENT_URL } from 'src/app/models/tokens';

@Injectable({ providedIn: 'root' })
export abstract class BaseEntityService {

    protected activeEnvironmentUrl$: Observable<string>

    protected httpClient: HttpClient = inject(HttpClient)
    protected cacheService: CacheStorageService = inject(CacheStorageService)
    protected environmentServcie: EnvironmentEntityService = inject(EnvironmentEntityService)
    protected aciveEnvironmentUrl: BehaviorSubject<string> = inject(ACTIVE_ENVIRONMENT_URL)

    constructor() { }
}
