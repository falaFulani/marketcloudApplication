import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StorageProvider {
Storage = localStorage;
  get(key){
    return this.Storage.getItem(key);
  }
  constructor() {
    console.log('Hello StorageProvider Provider');
  }
   getObject(key){
    let value = this.get(key);
    let returnValue;
    if (value){
      returnValue = JSON.parse(value);
    } else{
      returnValue = null;
    }
    return returnValue;
  }
  setObject(key, value){
    this.Storage.setItem(key, JSON.stringify(value));
  }
  remove(key){
    this.Storage.removeItem(key);
  }

}
