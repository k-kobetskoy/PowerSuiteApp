import { Observable } from "rxjs";
import { BaseGetRequestProcessor } from "./abstract/base-get-request-processor";

export class GetRequestProcessor<T> extends BaseGetRequestProcessor<T> {    

    override get(requestFuncion?: () => Observable<T>): Observable<T> {
        this.httpGet(requestFuncion)
        return this.subject$.asObservable()
    }
}
