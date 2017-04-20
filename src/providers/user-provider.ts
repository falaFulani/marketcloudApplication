import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {StorageProvider} from '../providers/storage-provider';
import {MarketProvider} from '../providers/market-provider';
declare var Marketcloud:any;
import '../../node_modules/marketcloud-js/dist/marketcloud.min';
/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
 market: any;
  constructor(public markettcloud: MarketProvider,public storage: StorageProvider) {
   this.market= this.markettcloud.getMarketCloud();
    console.log('Hello UserProvider Provider');
  }
  isLoggedIn(){
    let user = this.storage.getObject('user');
    if(user){
      return true;
    } else return  false;
  }
   createUser(user){
    let promise = new Promise((resolve,reject)=>{
      console.log(user);
      this.market.user.create(user,(err,user)=>{
        if (user){
          resolve(user);
        } else{
          reject(err);
        }
      })
    });
    return promise;
  }
authUser(user){
  let promise = new Promise((resolve,reject)=>{
    this.market.user.authenticate(user.email, user.password,(err,data)=>{
      if(err){
        reject (err);
      } else{
        resolve(data);
      }
    })
  });
  return promise;
}
logout() {
    this.storage.remove('user');
    Marketcloud.token =null;
    delete Marketcloud.user;
  }
   getCurrentUser() {
  let promise = new Promise((resolve, reject) => {
      this.market.users.getCurrent((err, user) => {
        if(user) {
          resolve(user);
        } else {
          console.log(err);
          reject(err);
        }
      })
    });
    return promise;
  }
   getAddress() {
   let promise = new Promise((resolve, reject) => {
      this.market.addresses.list({},(err, address) => {
        console.log(err,address)
        if(address) {
          resolve(address);
        } else {
          reject(err);
        }
      })
   });
   return promise;
 }
 createAddress(address) {
   let promise = new Promise((resolve, reject) => {
     this.market.addresses.create(address, (err, address) => {
       if(address) {
         resolve(address);
       } else {
         reject(err);
       }
     });
   })
   
   return promise;
 }
}
