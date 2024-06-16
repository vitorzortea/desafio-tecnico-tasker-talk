import { Injectable } from '@angular/core';
type Content = {key:string, value?:string};

@Injectable({
  providedIn:'root'
})
export class StorageService {

  constructor() { }

  setItem(key:string, value:string):void { this.changeStorage('setItem', key, value) }

  getItem(key:string):string|null { return (this.changeStorage('getItem', key) as string|null) }

  removeItem(key:string):void { this.changeStorage('removeItem', key) }

  clear():void { this.changeStorage('clear'); }

  private changeStorage(
    action:'setItem'|'getItem'|'removeItem'|'clear',
    key?:string,
    value?:string,
  ){
    if (typeof window !== 'undefined') {
      const contentMap= {
        setItem:()=>sessionStorage.setItem(key || '', value || ''),
        getItem:()=>sessionStorage.getItem(key || ''),
        removeItem:()=>sessionStorage.removeItem(key || ''),
        clear:()=>sessionStorage.clear(),
      };
      return contentMap[action]()
    }
    return null;
  }
}
