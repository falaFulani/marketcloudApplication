import { Injectable } from '@angular/core';
import{AlertController,LoadingController,ToastController} from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UtilProvider {

  constructor( public alert: AlertController,public Load:LoadingController,public toast: ToastController) {
    console.log('Hello UtilProvider Provider');
  }
 doAlert(title, message, buttonText) {
      let alertCtrl = this.alert.create ({
          title: title,
          subTitle: message,
          buttons: [buttonText]
      });
      return alertCtrl; 
  }
  presentLoading(content) {
    let loading = this.Load.create({
      dismissOnPageChange: true,
      content: content
    });
    return loading;
  }
   getToast(message) {
    let toast = this.toast.create({
      message: message,
      duration:2000
    });
    return toast;
  }
}
