import { IQueryNode } from "./abstract/i-query-node";

export class QueryNode implements IQueryNode {
    name: string;
    order: number;
    selfClosingTag: boolean;
    expandable: boolean;
    type: string;
    id?: string;
    actions?: string[];
    inputs?: string[];
    level?: number;
    isExpanded?: boolean;
    next?: IQueryNode | null;
    parent?: IQueryNode | null;
    visible: boolean;

    constructor(
        name: string,
        type: string,
        order: number,
        actions: string[],
        selfClosingTag: boolean = true,
        expandable: boolean = false,

    ) {
        this.name = name
        this.order = order
        this.type = type
        this.selfClosingTag = selfClosingTag
        this.expandable = expandable
        this.actions = actions
        this.level = 0
        this.visible = true
        this.isExpanded = true
        this.next = null
    };

    expandNode() {
        this.expandable = true
        if (!this.isExpanded) {
            this.toggleNode()
        }
    }

    toggleNode() {
        if (!this.expandable) { return; }

        this.isExpanded = !this.isExpanded;

        let parent = this;
        let nextNestedChild = this.next;

        while (nextNestedChild && nextNestedChild.level > parent.level) {
            if (!parent.isExpanded) {
                nextNestedChild.visible = false;
            } else {
                nextNestedChild.visible = nextNestedChild.parent.isExpanded && nextNestedChild.parent.visible;
            }
            nextNestedChild = nextNestedChild.next;
        }
    }
}
