import { Injectable } from '@angular/core';

@Injectable()

export class Constants {

    public static readonly GlobalDiscoApiEndpoint: string = 'https://globaldisco.crm.dynamics.com/api/discovery/v2.0'
    public static readonly GlobalDiscoInstances: string = 'Instances'
    public static readonly GraphApiEndpoint: string = 'https://graph.microsoft.com/v1.0'
    public static readonly GraphProfileInfo: string = 'me'
    public static readonly GraphPhoto: string = 'me/photo/$value'
}

