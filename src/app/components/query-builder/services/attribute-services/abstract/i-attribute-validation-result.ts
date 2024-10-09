import { Observable } from 'rxjs';

export interface IAttributeValidationResult {
    isValid$: Observable<boolean>;
    errorMessage: string;
}