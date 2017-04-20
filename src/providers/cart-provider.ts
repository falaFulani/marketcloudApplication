import { Injectable } from '@angular/core';
import { Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {StorageProvider} from '../providers/storage-provider';
import {MarketProvider} from '../providers/market-provider';
declare let BraintreePlugin: any;
declare let RazorpayCheckout: any;
//import '../../node_modules/braintree/lib/braintree.js';
/*
  Generated class for the CartProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CartProvider {
 cartID: string;
  market: any;
  constructor(public marketcloud:MarketProvider,public storage: StorageProvider ) {
   this.market = this.marketcloud.getMarketCloud();
    let local_card_id = this.storage.get('cart_id');
    if (local_card_id) {
      this.cartID = local_card_id;
    }
    console.log('Hello CartProvider Provider');
  }
setCartID(value) {
    console.log('set cart id', value);
    this.cartID = value;
    if (value) {
      this.storage.setObject('cart_id', value);
    } else {
      this.storage.remove('cart_id');
    }
  }
   intializePayment() {
    let marketcloud_id = this.marketcloud.getMarketCloud().public;
    console.log(marketcloud_id);
    let headers = new Headers({ 'Authorization': marketcloud_id });
    let promise = new Promise((res, rej) => {
      this.market.payments.braintree.createClientToken((err, data) => {
        if (err) {
          rej(err);
        } else {
          let token = data.clientToken;
          BraintreePlugin.intialize(token, () => res('done'), (error) => rej(error));
          console.log(data);
          res(data);
        }
      });
    });
    return promise;
  }
   addToCart(productID, quanity) {
    console.log(this.isCartExist());
    let promise = new Promise((resolve, reject) => {
      if (!this.isCartExist()) {
        this.market.cart.create({
          items: [{ 'product_id': productID, 'quanity': quanity }]
        }, (err, cart) => {
          if (err) {
            reject(err);
          } else {
            this.setCartID(cart.id);
            resolve(cart);
          }
        });
      } else {
        this.market.cart.add(this.cartID, [{ 'product_id': productID, 'quanity': quanity }], (err, cart) => {
          if (err) {
            reject(err);
          } else {
            resolve(cart);
          }
        });
      }
    });
    return promise;
  }
   isCartExist() {
    if (this.cartID) {
      console.log(this.cartID);
      return true;
    } else {
      return false
    };
  }
   getCartContents() {
    let promise = new Promise((resolve, reject) => {
      console.log(this.cartID);
      if (this.cartID !== undefined) {
        this.market.carts.getById(this.cartID, function (err, cart) {
          if (cart) {
            resolve(cart);
          } else {
            reject(err);
          }
        });

      } else {
        reject("no cart created yet");
      }

    });
    return promise;
  }
  updateCart(items) {
    items = items.map((item) => {
      return { product_id: item.product_id, quantity: item.quantity };
    });
    let promise = new Promise((resolve, reject) => {
      this.market.carts.update(this.cartID, items, (error, cart) => {
        if (cart) {
          resolve(cart);
        } else {
          reject(error);
        }
      })
    });

    return promise;
  }
  removeItem(item_id) {
    let promise = new Promise((resolve, reject) => {
      this.market.carts.remove(this.cartID, [{ product_id: item_id }], (error, cart) => {
        if (cart) {
          resolve(cart);
        } else {
          reject(error);
        }
      })
    });

    return promise;
  }
   createOrder(items, address) {
    items = items.map(function(item) {
      return {product_id:item.product_id, quantity: item.quantity};
    });
    
    let order = {
      shipping_address: address,
      billing_address: address,
      items: items
    };
let promise = new Promise((resolve, reject) => {
      this.market.orders.create(order,(error, data) =>{
        if(data) {
          resolve(data);
        } else {
          reject(error);
        }
      })
    });
    return promise;
}
getBrainTreePayments(amount, user) {
    var options = {
      cancelText: "Cancel",
      title: "Purchase",
      ctaText: "Select Payment Method",
      amount: "$" + amount.toString(),
      primaryDescription: "Your Item",
      secondaryDescription :"Free shipping!"
    };
    var promise = new Promise((res, rej) => {
      console.log('braintree payment called');
      console.log(BraintreePlugin);
      BraintreePlugin.presentDropInPaymentUI(options, function (result) {
        if (result.userCancelled) {
            rej('user cancelled');
        }
        else {
           console.log(result);
           res(result);
        }
      });
    });
    return promise; 
  }
   getPayment(amount,user) {
    let options = {
       description: 'Order Payment Successful',
        currency: 'INR',
        key: 'rzp_test_cVALY8lcJx6VZ5',
        amount: amount.toString(),
        name: name,
        prefill: {email: user.email, name:user.name},
        theme: {color: '#F37254'}
    };
}
}
