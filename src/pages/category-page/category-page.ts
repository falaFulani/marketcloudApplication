import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MarketProvider} from '../../providers/market-provider';
import {UtilProvider } from '../../providers/util-provider';

/**
 * Generated class for the CategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-category-page',
  templateUrl: 'category-page.html',
})
export class CategoryPage {
 category:any;
  loading:any;
  products:any;
  totalProducts:{};
  constructor(public navCtrl: NavController, public navParams: NavParams,public market: MarketProvider,public util:UtilProvider) {
 this.category = this.navParams.get('category');
 this.loading = this.util.presentLoading("Loading Products..."); 
 this.market.getProducts(this.category.id).then((data)=>{
   this.products = data;
   this.totalProducts=data;
   this.loading.dismiss();
 });

 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
