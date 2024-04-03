
import { Action } from "./action"
import { Input } from "./input"
import { FetchNodeType as FetchNodeType } from "./fetch-node-type"

export interface FetchNode {
    id: number | null
    name: string | null
    order: number | null
    type: FetchNodeType 
    actions: Action[] | null
    inputs: Input[] | null
    children: FetchNode[] | null
    selfClosing: boolean | null
}
