
import { Action } from "./action"
import { Input } from "./input"
import { FetchNodeType as FetchNodeType } from "./fetch-node-type"
import { Observable } from "rxjs"

export class FetchNode {
    id: string | null
    name: string | null
    order: number | null
    type: FetchNodeType 
    actions: Action[] | null
    inputs: Input[] | null
    children: FetchNode[] | null
    selfClosing: boolean | null
}
