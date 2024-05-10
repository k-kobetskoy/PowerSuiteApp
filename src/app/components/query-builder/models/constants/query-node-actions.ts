import { QueryNodeType } from "./query-node-type"

export class QueryNodeActions {
    static readonly VALUE: string[] = []
    static readonly ORDER: string[] = []
    static readonly ATTRIBUTE: string[] = []
    static readonly CONDITION: string[] = [QueryNodeType.VALUE]
    static readonly FILTER: string[] = [QueryNodeType.CONDITION, QueryNodeType.FILTER]
    static readonly LINK: string[] = [QueryNodeType.ATTRIBUTE, QueryNodeType.FILTER, QueryNodeType.ORDER, QueryNodeType.LINK]
    static readonly ENTITY: string[] = [QueryNodeType.ATTRIBUTE, QueryNodeType.FILTER, QueryNodeType.ORDER, QueryNodeType.LINK]
    static readonly ROOT: string[] = [QueryNodeType.ENTITY]
}
