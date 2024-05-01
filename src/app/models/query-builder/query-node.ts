
import { Action } from "./action"
import { Input } from "./input"

export class FetchNode {
    id?: string 
    name?: string 
    order: number 
    type?: string 
    actions?: Action[] 
    inputs?: Input[] 
    selfClosing?: boolean 
    expandable: boolean 
    level?: number
    isExpanded?: boolean 
    next?: FetchNode | null
    parent?: FetchNode
    visible: boolean

    constructor(
        name: string,
        order: number,
        type: string,
        selfClosing: boolean,
        expandable: boolean,
        ) {
            this.level = 0
            this.visible= true
            this.name = name
            this.order = order
            this.type = type
            this.selfClosing = selfClosing
            this.expandable = expandable
            this.isExpanded= true
            this.next= null
    }
}
