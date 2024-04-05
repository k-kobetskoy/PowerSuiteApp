import { Injectable } from '@angular/core';
import { FetchNode } from '../models/fetch-master/fetch-node';
import { FetchNodeType } from '../models/fetch-master/fetch-node-type';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class Constants {

    public static readonly GlobalDiscoApiEndpoint: string = 'https://globaldisco.crm.dynamics.com/api/discovery/v2.0'
    public static readonly GlobalDiscoInstances: string = 'Instances'
    public static readonly GraphApiEndpoint: string = 'https://graph.microsoft.com/v1.0'
    public static readonly GraphProfileInfo: string = 'me'
    public static readonly GraphPhoto: string = 'me/photo/$value'

    public static value: FetchNodeType = { name: 'value', childRule: [], order:0 }
    public static order: FetchNodeType = { name: 'order', childRule: [], order:0}
    public static attribute: FetchNodeType = { name: 'attribute', childRule: [], order:1 }
    public static condition: FetchNodeType = { name: 'condition', childRule: ['value'], order:0 }
    public static filter: FetchNodeType = { name: 'filter', childRule: ['condition', 'filter'], order:4 }
    public static linkEntity: FetchNodeType = { name: 'linkEntity', childRule: ['attribute', 'filter', 'order', 'linkEntity'] , order:3}
    public static entity: FetchNodeType = { name: 'entity', childRule: ['attribute', 'filter', 'order', 'linkEntity'], order:3 }
    public static root: FetchNodeType = { name: 'root', childRule: ['entity'], order:0 }

    public static readonly initialEnitityNode: FetchNode = {
        id: '2',
        name: '(Entity)',
        order: 0,
        type: Constants.entity,
        actions: [],
        inputs: [],
        selfClosing: true,
        children: [],
        expandable: false,
        level: 1,
        isExpanded: false,
        next: null,
        nextExists: false
    }

    public static readonly initialRootNode: FetchNode = {
        id: '1',
        name: 'Root',
        order: 0,
        type: Constants.root,
        actions: [],
        inputs: [],
        children: [],
        selfClosing: false,
        expandable: false,
        level: 0,
        isExpanded: false,
        next: null,
        nextExists: false
    }
}

