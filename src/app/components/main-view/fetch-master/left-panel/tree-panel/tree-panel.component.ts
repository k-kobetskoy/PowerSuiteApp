import { CdkTree, CdkTreeNodeOutlet, NestedTreeControl, TreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, EventEmitter, IterableDiffers, OnInit, Output, TrackByFunction, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Constants } from 'src/app/config/constants';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';
import { FetchNodeTree } from 'src/app/models/fetch-master/fetch-node-tree';
import { NodesService } from 'src/app/services/fetch-master/nodes.service';



/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
}

const TREE_DATA = []

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


  constructor(private nodesService: NodesService) {  }

  ngOnInit() {
    this.nodeTree = new FetchNodeTree()
    this.dataSource = of(this.nodeTree)
  }

  flathasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  treeControl: TreeControl<FetchNode, FetchNode>;



  getParentNode(node: ExampleFlatNode) {
    const nodeIndex = TREE_DATA.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (TREE_DATA[i].level === node.level - 1) {
        return TREE_DATA[i];
      }
    }

    return null;
  }


  shouldRender(node: ExampleFlatNode) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }
  removeNode2() {
    
  }

  addNode2() {
    let node : FetchNode = {
      name: 'Pumpkins1111',
      expandable: false,
      level: 0,
      next: null,
      type: Constants.attribute,
      nextExists: false
    }
    this.nodeTree.addNode(this.nodeTree.root, node)

    for(let d of this.nodeTree){
      console.log(d)
    }
  }


 

  hasChild = (_: number, node: FetchNode) => !!node.children && node.children.length > 0

  toggleNode(node: FetchNode) {
    if (node !== this.selectedNode) {
      if (this.treeControl.getDescendants(node).includes(this.selectedNode)) {
        this.selectedNode = node
        this.onNodeSelect.emit(node)
      }
    }
  }

  selectNode(node: FetchNode) {
    this.onNodeSelect.emit(node)
    this.selectedNode = node
  }


  addNodeToTree(node: FetchNode) {

    if (this.selectNode) {
      this.nodesService.addChild(this.selectedNode, node)
    }
  }

}
