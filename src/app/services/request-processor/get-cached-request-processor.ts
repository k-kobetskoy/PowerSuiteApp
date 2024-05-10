import { Observable, of } from "rxjs";
import { BaseGetRequestProcessor } from "./abstract/base-get-request-processor";

export class GetCachedRequestProcessor<T> extends BaseGetRequestProcessor<T> {

    override get(key: string, requestFunction?: () => Observable<T>): Observable<T> {

        let item$ = this.cacheService.getItem<T>(key)

        if (!item$.value) {
            this.httpGet(requestFunction, key)
        }

        return item$.asObservable()
    }
}
