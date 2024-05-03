import { Observable } from "rxjs";
import { BaseGetRequestProcessor } from "./abstract/base-get-request-processor";

export class GetRequestProcessor<T> extends BaseGetRequestProcessor<T> {

    override get(requestFunction?: () => Observable<T>): Observable<T> {
        this.httpGet(requestFunction)
        return this.subject$.asObservable()
    }
}
