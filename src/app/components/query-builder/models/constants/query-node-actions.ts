export class QueryNodeActions {
    static readonly VALUE: string[] = []
    static readonly ORDER: string[] = []
    static readonly ATTRIBUTE: string[] = []
    static readonly CONDITION: string[] = ['value']
    static readonly FILTER: string[] = ['condition', 'filter']
    static readonly LINK: string[] = ['attribute', 'filter', 'order', 'link']
    static readonly ENTITY: string[] = ['attribute', 'filter', 'order', 'link']
    static readonly ROOT: string[] = ['entity']
}
