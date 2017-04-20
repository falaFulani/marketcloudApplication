import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

declare var Marketcloud: any;
import '../../node_modules/marketcloud-js/dist/marketcloud.min';
/*
  Generated class for the MarketProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MarketProvider {
  market:any;
 client:any;
 utils:any;
  constructor() {
    Marketcloud.public ="8ef2f4df-186b-47f1-9072-c179776567a6";
    this.market = Marketcloud;
    console.log(this.market);
    console.log('Hello MarketProvider Provider');
  };
 getMarketCloud(){
    return this.market;
  }
   getCategories(){
    let promise = new Promise((resolve, reject)=>{
this.market.categories.list({},(error, categories)=>{
  if(categories){
    resolve(categories);
  }
  else{
    reject(error);
  }
});
    })
  return promise;
   };
     getProducts(categoryID){
     let promise = new Promise((resolve,reject)=>{
       this.market.products.list({category_id:categoryID},(error,products)=>{
         if(products){
           resolve(products);
           } else {
             reject(error);
           }
       });
     });
     return promise;
   };
}
