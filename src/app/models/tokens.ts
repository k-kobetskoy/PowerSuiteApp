import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const ACTIVE_ENVIRONMENT_URL = new InjectionToken<BehaviorSubject<string>>('ACTIVE_ENVIRONMENT_URL');
export const USER_IS_LOGGED_IN = new InjectionToken<BehaviorSubject<boolean>>('USER_IS_LOGGED_IN');