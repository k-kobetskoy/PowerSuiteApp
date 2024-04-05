
import { Action } from "./action"
import { Input } from "./input"
import { FetchNodeType as FetchNodeType } from "./fetch-node-type"

export class FetchNode {
    id?: string | null
    name?: string | null
    order?: number | null
    type: FetchNodeType
    actions?: Action[] | null
    inputs?: Input[] | null
    children?: FetchNode[] =[]
    selfClosing?: boolean | null
    expandable: boolean = false
    level?: number =0
    isExpanded?: boolean = true
    next: FetchNode | null = null
    nextExists: boolean = false
    parent?: FetchNode | null = null

}
