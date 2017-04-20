import { NgModule } from '@angular/core';
import {IonicPageModule } from 'ionic-angular';
import { StorePage } from './store-page';

@NgModule({
  declarations: [
    StorePage,
  ],
  imports: [
    IonicPageModule.forChild(StorePage),
  ],
  exports: [
    StorePage
  ]
})
export class StorePageModule {}
