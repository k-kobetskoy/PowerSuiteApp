import { IQueryNode } from "./abstract/i-query-node";

export class QueryNodeTree implements Iterable<IQueryNode> {
    root: IQueryNode

    [Symbol.iterator](): Iterator<IQueryNode, any, undefined> {

        let current = this.root

        return {
            next: () => {
                if (current) {
                    let val = current
                    current = current.next
                    return { done: false, value: val };
                } else {
                    return { done: true, value: null };
                }
            }
        }
    }
}