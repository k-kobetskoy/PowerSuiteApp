export interface IBaseCache {
    setItem(url:string, data:string):void
    getItem(url:string):string|null
    removeItem(url:string):void
    clear():void
}
