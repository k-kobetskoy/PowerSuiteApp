import { Observable } from "rxjs";
import { BaseGetRequestProcessor } from "./abstract/base-get-request-processor";

export class GetCachedRequestProcessor<T> extends BaseGetRequestProcessor<T> {

    override get(requestFuncion?: () => Observable<T>): Observable<T> {        
        if (this.subject$.value) return this.subject$.asObservable()

        this.httpGet(requestFuncion)

        return this.subject$.asObservable()
    }
}
