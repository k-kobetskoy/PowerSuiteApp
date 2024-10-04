import { Observable } from "rxjs";

export const TAG_PROPERTY_VALIDATION_FUNCIONS = {

    validateAlias: (): Observable<boolean> => {
        return new Observable<boolean>(observer => {
            observer.next(true);
        });
    }
}
