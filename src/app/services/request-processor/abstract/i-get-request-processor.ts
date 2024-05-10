import { Observable } from "rxjs"

export interface IGetRequestProcessor<T> {
    get(key: string, requestFunction?: () => Observable<T>): Observable<T>
}
