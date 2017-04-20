import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,Events  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import{StorePage}from '../pages/store-page/store-page';
import{ProductPage}from '../pages/product-page/product-page';
import{CategoryPage}from '../pages/category-page/category-page';
import{CartPage} from '../pages/cart-page/cart-page';
import {MarketProvider} from '../providers/market-provider';
import {StorageProvider} from '../providers/storage-provider';
import {UserProvider } from '../providers/user-provider';
import{CartProvider} from '../providers/cart-provider';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
market:any;
  rootPage: any = StorePage ;

  pages: Array<{title: string, component: any}>;
isLoggedIn = false;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
   public cartProvider:CartProvider, 
  public marketcloud: MarketProvider, 
  public storage: StorageProvider,
   public events:Events,   
  public userProvider: UserProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Shop', component: StorePage },
      { title: 'Category', component: CategoryPage},
      { title:'Product', component:ProductPage},
      { title:'Cart', component:CartPage}
    ];
events.subscribe('user:logged_out', () => {
       this.isLoggedIn = false;
    });
    events.subscribe('user:logged_in', () => {
      this.isLoggedIn = true;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let user = this.storage.getObject('user');
      if(user) {
        this.market.getMarketCloud().token = user.token;
        this.market.getMarketCloud().user = user.user;
        this.isLoggedIn = true;
      }
      this.cartProvider.intializePayment();
    });
    
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    this.userProvider.logout();
    this.events.publish('user:logged_out', {});
  }
}
