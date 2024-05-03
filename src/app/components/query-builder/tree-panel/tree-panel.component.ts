import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IQueryNode } from '../models/abstract/i-query-node';
import { QueryNodeTree } from 'src/app/components/query-builder/models/query-node-tree';
import { AppEvents } from 'src/app/services/event-bus/app-events';
import { EventBusService } from 'src/app/services/event-bus/event-bus.service';

@Component({
  selector: 'app-tree-panel',
  templateUrl: './tree-panel.component.html',
  styleUrls: ['./tree-panel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TreePanelComponent implements OnInit {

  // @ViewChild('tree') tree: CdkTree<ChangeDetectorRef, IterableDiffers>
  // @ViewChild('treeNodeOutlet') treeNodeOutlet: CdkTreeNodeOutlet

  nodeTree: QueryNodeTree = new QueryNodeTree()
  dataSource$: Observable<QueryNodeTree>
  selectedNode: IQueryNode = this.nodeTree.selectedNode

  constructor(
    private eventBus: EventBusService) { }

  ngOnInit() {
    this.dataSource$ = of(this.nodeTree)
    this.eventBus.on(AppEvents.ENVIRONMENT_CHANGED, () => this.ngOnInit())
  }

  // toggleNode(node: IQueryNode) {





    // if (!node.expandable) { return }
    // node.isExpanded = !node.isExpanded

    // let parent = node
    // let nextNestedChild = node.next
    // let checkSelectedNode = parent != this.selectedNode && parent.level < this.selectedNode.level

    // while (nextNestedChild && nextNestedChild.level > parent.level) {
    //   if (!parent.isExpanded) {
    //     if (checkSelectedNode) {
    //       if (this.selectedNode === nextNestedChild) {
    //         this.selectedNode = parent
    //         this.onNodeSelect.emit(parent)
    //       }
    //     }
    //     nextNestedChild.visible = false
    //   } else {
    //     nextNestedChild.visible = nextNestedChild.parent.isExpanded && nextNestedChild.parent.visible ? true : false
    //   }

    //   nextNestedChild = nextNestedChild.next
    // }
  // }

  selectNode(node: IQueryNode) {
    this.nodeTree.selectedNode = node
  }

  addBaseNodeToTree(nodeName: string) {
    this.nodeTree.addNode(nodeName)
  }
}
