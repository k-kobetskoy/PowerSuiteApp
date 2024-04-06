import { Injectable } from '@angular/core';

@Injectable()

export class Constants {

    public static readonly GlobalDiscoApiEndpoint: string = 'https://globaldisco.crm.dynamics.com/api/discovery/v2.0'
    public static readonly GlobalDiscoInstances: string = 'Instances'
    public static readonly GraphApiEndpoint: string = 'https://graph.microsoft.com/v1.0'
    public static readonly GraphProfileInfo: string = 'me'
    public static readonly GraphPhoto: string = 'me/photo/$value'

    // public static value: FetchNodeType = { name: 'value', childRule: [], order:0 }
    // public static order: FetchNodeType = { name: 'order', childRule: [], order:0}
    // public static attribute: FetchNodeType = { name: 'attribute', childRule: [], order:1 }
    // public static condition: FetchNodeType = { name: 'condition', childRule: ['value'], order:0 }
    // public static filter: FetchNodeType = { name: 'filter', childRule: ['condition', 'filter'], order:4 }
    // public static link: FetchNodeType = { name: 'link', childRule: ['attribute', 'filter', 'order', 'link'] , order:3}
    // public static entity: FetchNodeType = { name: 'entity', childRule: ['attribute', 'filter', 'order', 'link'], order:3 }
    // public static root: FetchNodeType = { name: 'root', childRule: ['entity'], order:0 }    
}

