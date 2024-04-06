import { Injectable } from "@angular/core"

Injectable()
export class FetchNodeType {
    public static readonly value: string = 'value'
    public static readonly order: string = 'order'
    public static readonly attribute: string = 'attribute'
    public static readonly condition: string = 'condition'
    public static readonly filter: string = 'filter'
    public static readonly link: string = 'link'
    public static readonly entity: string = 'entity'
    public static readonly root: string = 'root'
}
