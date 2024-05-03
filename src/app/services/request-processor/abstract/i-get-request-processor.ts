import { Observable } from "rxjs"

export interface IGetRequestProcessor<T> {
    get(requestFunction?: () => Observable<T>): Observable<T>
}
