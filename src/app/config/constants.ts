import { Injectable } from '@angular/core';
import { FetchNode } from '../models/fetch-master/fetch-node';
import { FetchNodeType } from '../models/fetch-master/fetch-node-type';

@Injectable()

export class Constants {


    public static readonly maxNodeId : string = 'maxNodeId'

    public static readonly urls = new Map([
        ['GLOBAL_DISCO_API_ENDPOINT', 'https://globaldisco.crm.dynamics.com/api/discovery/v2.0'],
        ['GLOBAL_DISCO_INSTANCES', 'Instances'],
        ['GRAPH_API_ENDPOINT', 'https://graph.microsoft.com/v1.0'],
        ['GRAPH_PROFILE_INFO', 'me'],
        ['GRAPH_PHOTO', 'me/photo/$value']])


    public static readonly nodeTypes = new Map([
        ['value', { name: 'value', childRule: [] }],
        ['order', { name: 'order', childRule: [] }],
        ['attribute', { name: 'attribute', childRule: [] }],
        ['condition', { name: 'condition', childRule: ['value'] }],
        ['filter', { name: 'filter', childRule: ['condition', 'filter'] }],
        ['linkEntity', { name: 'linkEntity', childRule: ['attribute', 'filter', 'order', 'linkEntity'] }],
        ['entity', { name: 'entity', childRule: ['attribute', 'filter', 'order', 'linkEntity'] }],
        ['root', { name: 'root', childRule: ['entity'] }],
    ])

    public static readonly initialEnitityNode : FetchNode = {
        id: 2,
        name: '(Entity)',
        order: 1,
        type: Constants.nodeTypes.get('entity'),
        actions: [],
        inputs: [],
        children: [],
        selfClosing: true
    }

    public static readonly initialRootNode: FetchNode = {
        id: 1,
        name: 'Root',
        order: 0,
        type: Constants.nodeTypes.get('root'),
        actions: [],
        inputs: [],
        children: [Constants.initialEnitityNode],
        selfClosing: false
    }
}

