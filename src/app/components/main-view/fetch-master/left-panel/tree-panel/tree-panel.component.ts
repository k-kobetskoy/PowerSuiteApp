import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Constants } from 'src/app/config/constants';
import { FetchNode } from 'src/app/models/fetch-master/fetch-node';
import { FetchNodeTree } from 'src/app/models/fetch-master/fetch-node-tree';
import { NodesService } from 'src/app/services/fetch-master/nodes.service';



interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

@Component({
  selector: 'app-tree-panel',
  templateUrl: './tree-panel.component.html',
  styleUrls: ['./tree-panel.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class TreePanelComponent implements OnInit {





  selectedNode: FoodNode


  selectedNode2: FetchNode
  @Output() onNodeSelect = new EventEmitter<FetchNode>()

  nodeTree: FetchNodeTree = { id: this.nodesService.generateUniqueTreeId(), nodes: [Constants.initialRootNode] }
  options = {};

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);


  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
  constructor(private cd: ChangeDetectorRef, private nodesService: NodesService) { }


  ngOnInit() {
  }

  select(node: FoodNode) {
    this.selectedNode = node
  }

  toggleNode(node: FoodNode) {

    if (node !== this.selectedNode) {
      if (this.treeControl.getDescendants(node).includes(this.selectedNode)) {
        this.selectedNode = node
      }
    }
  }

  selectNode(event: any) {
    this.onNodeSelect.emit(event.node.data)
    this.selectedNode = event.node.data
  }

  addNode(node: FetchNode) {
    this.nodesService.addNodeToTree(this.selectedNode2, node, this.nodeTree)
    this.nodeTree.nodes = [...this.nodeTree.nodes]
    this.cd.detectChanges()
  }
}
