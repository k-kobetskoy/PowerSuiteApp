import { Injectable } from "@angular/core"

Injectable()
export class FetchNodeChildRule {
    public static readonly value: string[] = []
    public static readonly order: string[] = []
    public static readonly attribute: string[] = []
    public static readonly condition: string[] = ['value']
    public static readonly filter: string[] = ['condition', 'filter']
    public static readonly link: string[] = ['attribute', 'filter', 'order', 'link']
    public static readonly entity: string[] = ['attribute', 'filter', 'order', 'link']
    public static readonly root: string[] = ['entity']
}