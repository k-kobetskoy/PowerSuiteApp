import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";
import { AttributeTreeViewDisplayStyle } from "./constants/attribute-tree-view-display-style";

export class AttributeDisplayProperties {
    displayOnTreeView: boolean;
    treeViewDisplayValue$: Observable<string>;
    editorViewDisplayValue$: Observable<string>;

    constructor(attributeValue$: BehaviorSubject<string>, editorViewDisplayName: string, treeViewDisplayName?: string, treeViewDisplayStyle: string = AttributeTreeViewDisplayStyle.onlyName) {
        this.displayOnTreeView = !!treeViewDisplayName;

        if (this.displayOnTreeView) {
            if (treeViewDisplayStyle === AttributeTreeViewDisplayStyle.onlyName) {
                this.treeViewDisplayValue$ = attributeValue$.pipe(distinctUntilChanged(), map(value => value ? `${treeViewDisplayName}` : ''));
            } else if (treeViewDisplayStyle === AttributeTreeViewDisplayStyle.withValue) {
                this.treeViewDisplayValue$ = attributeValue$.pipe(distinctUntilChanged(), map(value => value ? `${treeViewDisplayName}:${value}` : ''));
            }
        }

        this.editorViewDisplayValue$ = attributeValue$.pipe(distinctUntilChanged(), map(value => value ? `${editorViewDisplayName}="${value}"` : ''));
    }
}
