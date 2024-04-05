import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkTree, CdkTreeNodeOutlet, FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, EventEmitter, IterableDiffers, OnInit, Output, TrackByFunction, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';
import { NodesService } from 'src/app/services/fetch-master/nodes.service';



const TREE_DATA: ExampleFlatNode[] = [
  {
    name: 'Fruit',
    expandable: true,
    level: 0,
  },
  {
    name: 'Apple',
    expandable: false,
    level: 1,
  },
  {
    name: 'Banana',
    expandable: false,
    level: 1,
  },
  {
    name: 'Fruit loops',
    expandable: false,
    level: 1,
  },
  {
    name: 'Vegetables',
    expandable: true,
    level: 0,
  },
  {
    name: 'Green',
    expandable: true,
    level: 1,
  },
  {
    name: 'Broccoli',
    expandable: false,
    level: 2,
  },
  {
    name: 'Brussels sprouts',
    expandable: false,
    level: 2,
  },
  {
    name: 'Orange',
    expandable: true,
    level: 1,
  },
  {
    name: 'Pumpkins',
    expandable: false,
    level: 2,
  },
  {
    name: 'Carrots',
    expandable: false,
    level: 2,
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
}



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


  nodeTree: FetchNode[]
  selectedNode: FetchNode
  treeControl = new NestedTreeControl<FetchNode>(node => node.children)
  dataChange: BehaviorSubject<FetchNode[]> = new BehaviorSubject<FetchNode[]>([])
  dataSource: FetchNode[]


  // ------------flat tree ----------------//

  flattreeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  test(node){
    console.log(node)
  }
  trackBy2: TrackByFunction<ExampleFlatNode> = (index, node)=>node.name
  
  dataSource2 = of(TREE_DATA)
  
  flathasChild = (_: number, node: ExampleFlatNode) => node.expandable;



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
  removeNode2(){
    TREE_DATA.pop()
  }

  addNode2(){
    
    
    let node ={
      name: 'Pumpkins1111',
      expandable: false,
      level: 2,    
    }
    TREE_DATA.push(node)
    
    
    
    console.log(TREE_DATA)
  
  }

// ------------flat tree ----------------//

  track: TrackByFunction<FetchNode> = (index, node) => node.id;

  constructor(private cd: ChangeDetectorRef, private nodesService: NodesService, private differs: IterableDiffers) {
    this.dataChange.subscribe(data=>this.dataSource = data)
    
    this.nodeTree = this.nodesService.getInitialNodes()
    this.dataChange.next(this.nodeTree)
  }

  ngOnInit() {

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
    this.dataChange.next(this.nodeTree)
    
    // this.cd.detectChanges()
  }

}
