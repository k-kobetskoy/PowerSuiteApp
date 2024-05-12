import { InjectionToken, inject } from "@angular/core";
import { LocalStorageService } from "../../data-sorage/local-storage.service";
import { SessionStorageService } from "../../data-sorage/session-storage.service";
import { ActiveEnvironmentRequestProcessor } from "../active-environment-request-processor";
import { StoreRequestProcessor } from "../store-request-processor";
import { GetCachedRequestProcessor } from "../get-cached-request-processor";
import { EntityModel } from "src/app/models/incoming/environment/entity-model";
import { AttributeModel } from "src/app/models/incoming/attrubute/attribute-model";


export const GET_CACHED_ENTITY_REQUEST_PROCESSOR = new InjectionToken<GetCachedRequestProcessor<any>>(
    'LOCAL_STORAGE_REQUEST_PROCESSOR', { factory: () => new GetCachedRequestProcessor<EntityModel[]>(), providedIn: 'root' }
)

export const GET_CACHED_ATTRIBUTE_REQUEST_PROCESSOR = new InjectionToken<GetCachedRequestProcessor<any>>(
    'LOCAL_STORAGE_REQUEST_PROCESSOR', { factory: () => new GetCachedRequestProcessor<AttributeModel[]>(), providedIn: 'root' }
)

export const LOCAL_STORAGE_REQUEST_PROCESSOR = new InjectionToken<StoreRequestProcessor<any, LocalStorageService>>(
    'LOCAL_STORAGE_REQUEST_PROCESSOR', { factory: () => new StoreRequestProcessor<any, LocalStorageService>(inject(LocalStorageService)), providedIn: 'root' }
)

export const SESSION_STORAGE_REQUEST_PROCESSOR = new InjectionToken<StoreRequestProcessor<any, SessionStorageService>>(
    'SESSION_STORAGE_REQUEST_PROCESSOR', { factory: () => new StoreRequestProcessor<any, SessionStorageService>(inject(SessionStorageService)), providedIn: 'root' }
)

export const ACTIVE_ENVIRONMENT_REQUEST_PROCESSOR = new InjectionToken<ActiveEnvironmentRequestProcessor<any, SessionStorageService>>(
    'SESSION_STORAGE_REQUEST_PROCESSOR', { factory: () => new ActiveEnvironmentRequestProcessor<any, SessionStorageService>(inject(SessionStorageService)), providedIn: 'root' }
)
