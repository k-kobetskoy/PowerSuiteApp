import { Injectable } from '@angular/core';

@Injectable()

export class Constants {
    public static readonly GLOBAL_DISCO_API_ENDPOINT: string = 'https://globaldisco.crm.dynamics.com/api/discovery/v2.0';
    public static readonly GLOBAL_DISCO_INSTANCES: string = 'Instances';
    public static readonly GRAPH_API_ENDPOINT: string ='https://graph.microsoft.com/v1.0'
    public static readonly GRAPH_PROFILE_INFO: string = 'me'
    public static readonly GRAPH_PHOTO:string = 'me/photo/$value'
} 