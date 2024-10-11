import { BehaviorSubject, distinctUntilChanged, map, Observable } from "rxjs";
import { AttributeTreeViewDisplayStyle } from "./constants/attribute-tree-view-display-style";

export class AttributeDisplayProperties {
    displayOnTreeView: boolean;
    treeViewDisplayValue$: Observable<string>;
    editorViewDisplayValue$: Observable<string>;

    constructor(attributeValue$: BehaviorSubject<string>, editorViewDisplayName: string, treeViewDisplayName?: string, treeViewDisplayStyle: string = AttributeTreeViewDisplayStyle.none) {
        this.displayOnTreeView = !!treeViewDisplayName;

        switch (treeViewDisplayStyle) {
            case AttributeTreeViewDisplayStyle.onlyName:
                this.treeViewDisplayValue$ = attributeValue$.pipe(distinctUntilChanged(), map(value => value ? `${treeViewDisplayName}` : ''));
                break;
            case AttributeTreeViewDisplayStyle.nameWithValue:
                this.treeViewDisplayValue$ = attributeValue$.pipe(distinctUntilChanged(), map(value => value ? `${treeViewDisplayName}:${value}` : ''));
                break;
            case AttributeTreeViewDisplayStyle.onlyValue:
                this.treeViewDisplayValue$ = attributeValue$.pipe(distinctUntilChanged(), map(value => value ? `${value}` : ''));
                break;
            case AttributeTreeViewDisplayStyle.alias:
                this.treeViewDisplayValue$ = attributeValue$.pipe(distinctUntilChanged(), map(value => value ? `(${value})` : ''));
                break;
            default:
                break;
        }

        this.editorViewDisplayValue$ = attributeValue$.pipe(distinctUntilChanged(), map(value => value ? `${editorViewDisplayName}="${value}"` : ''));
    }
}
