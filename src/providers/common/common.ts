import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { isUndefined } from 'ionic-angular/util/util';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  private _loading;

  constructor(private loadingCtrl: LoadingController) {}

  showLoader(){
    this._loading = this.loadingCtrl.create({content: 'Please wait...'});
    this._loading.present();
  }

  hideLoader(){
    if(!isUndefined(this._loading)&&!isUndefined(this._loading.dismiss)){
      this._loading = this._loading.dismiss();
    }
  }

}
