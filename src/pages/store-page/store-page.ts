import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MarketProvider} from '../../providers/market-provider';
import {UtilProvider } from '../../providers/util-provider';
import {CategoryPage} from '../category-page/category-page';
/**
 * Generated class for the StorePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-store-page',
  templateUrl: 'store-page.html',
})
export class StorePage {
 categories: any;
  constructor(public market: MarketProvider,public navCtrl: NavController, public navParams: NavParams, public util:UtilProvider) {
    this.market.getCategories()
    .then((data) => {
       this.categories = data;
    });
  }
openProducts(category) {
    this.navCtrl.push(CategoryPage, {category: category});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StorePage');
  }

}
