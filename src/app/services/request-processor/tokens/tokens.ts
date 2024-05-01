import { InjectionToken, inject } from "@angular/core";
import { LocalStorageService } from "../../data-sorage/local-storage.service";
import { SessionStorageService } from "../../data-sorage/session-storage.service";
import { ActiveEnvironmentProcessor } from "../active-environment-processor";
import { StoreRequestProcessor } from "../store-request-processor";
import { GetCachedRequestProcessor } from "../get-cached-request-processor";


export const GET_CACHED_REQUEST_PROCESSOR = new InjectionToken<GetCachedRequestProcessor<any>>(
    'LOCAL_STORAGE_REQUEST_PROCESSOR', { factory: () => new GetCachedRequestProcessor<any>(), providedIn: 'root' }
)

export const LOCAL_STORAGE_REQUEST_PROCESSOR = new InjectionToken<StoreRequestProcessor<any, LocalStorageService>>(
    'LOCAL_STORAGE_REQUEST_PROCESSOR', { factory: () => new StoreRequestProcessor<any, LocalStorageService>(inject(LocalStorageService)), providedIn: 'root' }
)

export const SESSION_STORAGE_REQUEST_PROCESSOR = new InjectionToken<StoreRequestProcessor<any, SessionStorageService>>(
    'SESSION_STORAGE_REQUEST_PROCESSOR', { factory: () => new StoreRequestProcessor<any, SessionStorageService>(inject(SessionStorageService)), providedIn: 'root' }
)

export const ACTIVE_ENVIRONMENT_REQUEST_PROCESSOR = new InjectionToken<ActiveEnvironmentProcessor<any, SessionStorageService>>(
    'SESSION_STORAGE_REQUEST_PROCESSOR', { factory: () => new ActiveEnvironmentProcessor<any, SessionStorageService>(inject(SessionStorageService)), providedIn: 'root' }
)
