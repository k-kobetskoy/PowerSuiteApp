import { CdkTree, CdkTreeNodeOutlet } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, EventEmitter, IterableDiffers, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QueryNode } from 'src/app/models/query-builder/query-node';
import { QueryNodeTree } from 'src/app/models/query-builder/query-node-tree';
import { AppEvents } from 'src/app/services/event-bus/app-events';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';
import { NodeFactoryService } from 'src/app/services/query-builder/nodes-factory.service';

@Component({
  selector: 'app-tree-panel',
  templateUrl: './tree-panel.component.html',
  styleUrls: ['./tree-panel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TreePanelComponent implements OnInit {

  @Output() onNodeSelect = new EventEmitter<QueryNode>()
  @ViewChild('tree') tree: CdkTree<ChangeDetectorRef, IterableDiffers>
  @ViewChild('treeNodeOutlet') treeNodeOutlet: CdkTreeNodeOutlet

  nodeTree: QueryNodeTree
  selectedNode: QueryNode
  dataSource$: Observable<QueryNodeTree>


  constructor(
    private nodeFactory: NodeFactoryService,
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.nodeTree = new QueryNodeTree(this.nodeFactory)
    this.dataSource$ = of(this.nodeTree)
    this.eventBus.on(AppEvents.ENVIRONMENT_CHANGED, () => this.ngOnInit())
  }

  toggleNode(node: QueryNode) {

    if (!node.expandable) { return }
    node.isExpanded = !node.isExpanded

    let parent = node
    let nextNestedChild = node.next
    let checkSelectedNode = parent != this.selectedNode && parent.level < this.selectedNode.level

    while (nextNestedChild && nextNestedChild.level > parent.level) {
      if (!parent.isExpanded) {
        if (checkSelectedNode) {
          if (this.selectedNode === nextNestedChild) {
            this.selectedNode = parent
            this.onNodeSelect.emit(parent)
          }
        }
        nextNestedChild.visible = false
      } else {
        nextNestedChild.visible = nextNestedChild.parent.isExpanded && nextNestedChild.parent.visible ? true : false
      }

      nextNestedChild = nextNestedChild.next
    }
  }

  selectNode(node: QueryNode) {
    this.onNodeSelect.emit(node)
    this.selectedNode = node
  }

  addBaseNodeToTree(nodeName: string) {
    let node = this.nodeTree.addNode(this.selectedNode, nodeName)
    this.selectedNode = node
    this.onNodeSelect.emit(node)
  }
}
