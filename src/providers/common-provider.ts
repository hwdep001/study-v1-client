import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { Loading } from 'ionic-angular/components/loading/loading';
import { ToastOptions } from 'ionic-angular/components/toast/toast-options';

@Injectable()
export class CommonProvider {

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
  }

  /**
   * 
   * @param spinner 
   * @param content 
   * @param duration default 15000 ms
   * @param dismissOnPageChange
   */
  getLoader(spinner: string, content: string, duration?: number, dismissOnPageChange?: boolean): Loading {
    spinner = spinner ? spinner : "bubbles";
    content = content ? content : "Loading...";
    duration = duration ? duration : 30000;
    dismissOnPageChange = dismissOnPageChange == true ? true : false;
    
    return this.loadingCtrl.create({
      spinner: spinner,
      content: content,
      duration: duration,
      dismissOnPageChange: dismissOnPageChange
    });
  }

  public Alert = {
    confirm: (msg?, title?) => {
      return new Promise((resolve, reject) => {
        let alert = this.alertCtrl.create({
          title: title || 'Confirm',
          message: msg || 'Do you want continue?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                reject(false);
              }
            },
            {
              text: 'Ok',
              handler: () => {
                resolve(true);
              }
            }
          ]
        });
        alert.present();
      });

    },
    alert: (msg, title?) => {
      let alert = this.alertCtrl.create({
        title: title || 'Alert',
        subTitle: msg,
        buttons: ['Close']
      });

      alert.present();
    }
  }

  public Toast = {
    present: (
      position: string, 
      message: string, 
      cssClass: string, 
      duration?: number) => {

      let options: ToastOptions = {
        message: message,
        position: position,
        duration: (duration == null) ? 2500 : duration
      }
      if(cssClass != null) {
        options.cssClass = cssClass;
      }

      this.toastCtrl.create(options).present();
    }
  }

}