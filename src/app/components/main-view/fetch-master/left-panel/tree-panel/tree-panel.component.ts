import { CdkTree, CdkTreeNodeOutlet } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, EventEmitter, IterableDiffers, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';
import { FetchNodeTree } from 'src/app/models/fetch-master/fetch-node-tree';
import { NodeFactoryService } from 'src/app/services/fetch-master/nodes-factory.service';

@Component({
  selector: 'app-tree-panel',
  templateUrl: './tree-panel.component.html',
  styleUrls: ['./tree-panel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TreePanelComponent implements OnInit {


  @Output() onNodeSelect = new EventEmitter<FetchNode>()
  @ViewChild('tree') tree: CdkTree<ChangeDetectorRef, IterableDiffers>
  @ViewChild('treeNodeOutlet') treeNodeOutlet: CdkTreeNodeOutlet



  nodeTree: FetchNodeTree
  selectedNode: FetchNode
  dataSource: Observable<FetchNodeTree>


  constructor(private nodeFactory: NodeFactoryService) { }

  ngOnInit() {
    this.nodeTree = new FetchNodeTree(this.nodeFactory)
    this.dataSource = of(this.nodeTree)
  }

  toggleNode(node: FetchNode) {
    
    if (!node.expandable) { return }
    node.isExpanded = !node.isExpanded

    let parent = node
    let nextNestedChild = node.next
    let checkSelectedNode = parent!=this.selectedNode && parent.level< this.selectedNode.level

    while (nextNestedChild && nextNestedChild.level > parent.level) {                
      if(!parent.isExpanded){
        if(checkSelectedNode){
          if(this.selectedNode === nextNestedChild){
            this.selectedNode = parent
            this.onNodeSelect.emit(parent)
          }          
        }
        nextNestedChild.visible = false
      }else{              
        nextNestedChild.visible = nextNestedChild.parent.isExpanded &&nextNestedChild.parent.visible ? true : false
      }
     
      nextNestedChild = nextNestedChild.next
    }
  }

  selectNode(node: FetchNode) {
    this.onNodeSelect.emit(node)
    this.selectedNode = node
  }

  addBaseNodeToTree(nodeName: string) {
    let node = this.nodeTree.addNode(this.selectedNode, nodeName)
    this.selectedNode = node
    this.onNodeSelect.emit(node)
  }
}
