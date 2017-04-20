import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import{AuthPage } from '../pages/auth-page/auth-page';
import{CartPage} from '../pages/cart-page/cart-page';
import{CategoryPage}from '../pages/category-page/category-page';
import{ImageModal}from '../pages/image-modal/image-modal';
import{OrderPage } from '../pages/order-page/order-page';
import{ProductPage}from '../pages/product-page/product-page';
import{StorePage}from '../pages/store-page/store-page';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//providers
import{CartProvider} from '../providers/cart-provider';
import {MarketProvider} from '../providers/market-provider';
import {StorageProvider} from '../providers/storage-provider';
import {UserProvider } from '../providers/user-provider';
import {UtilProvider } from '../providers/util-provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    StorePage,
    ProductPage,
    OrderPage,
    ImageModal,
    CategoryPage,
    CartPage,
    AuthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    StorePage,
    ProductPage,
    OrderPage,
    ImageModal,
    CategoryPage,
    CartPage,
    AuthPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserProvider,
    UtilProvider,
    StorageProvider,
    MarketProvider,
    CartProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
