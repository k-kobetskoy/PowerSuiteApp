import { Observable } from "rxjs"

export interface IGetRequestProcessor<T> {
    get(requestFuncion?: () => Observable<T>): Observable<T>
}
