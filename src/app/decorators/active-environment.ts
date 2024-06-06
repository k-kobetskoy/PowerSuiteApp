import { Observable, map } from 'rxjs';
import { EnvironmentModel } from '../models/environment-model';

export function ActiveEnvironment(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {

        if (this.activeEnvironmentUrlSubject$?.value) {
            this.activeEnvironmentUrl$ = this.activeEnvironmentUrlSubject$.asObservable();
            return originalMethod.apply(this, args);
        }

        const activeEnvironment$: Observable<EnvironmentModel> = this.environmentServcie.getActiveEnvironment();

        this.activeEnvironmentUrl$ = activeEnvironment$.pipe(map(env => env?.apiUrl));

        return originalMethod.apply(this, args);
    };

    return descriptor;
}