import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { isUndefined } from 'ionic-angular/util/util';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  private _onAuthStateChanged;
  private _loading;
  constructor(
    private _userSrv: UserProvider,
    private menu: MenuController,
    public loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController, 
    public toastCtrl: ToastController,
    public navParams: NavParams, 
    public formBuilder: FormBuilder) {
    this.initForm();
  }

  ionViewDidLoad(){
    this.menu.swipeEnable(false);
    this.asyncUserCall();
  }

  async asyncUserCall(){
    this.showLoader();
     this._onAuthStateChanged = await this.afAuth.auth.onAuthStateChanged((user)=> {
      const route  = this.navCtrl.getActive().name;
      if (user &&  route === "LoginPage") {
          ;
        this._userSrv.setUser({uid:user.uid, email:user.email, displayName:user.displayName});
        this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
      }
      this.hideLoader();

    });
  }

  ionViewDidLeave(){
    this._onAuthStateChanged();
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      user:['', Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]] 
    });
  }

  login(){
    if(!this.loginForm.valid){
      this.showError('Please Enter User & Password!');
      return;
    }
    this.showLoader();
    this.afAuth.auth.signInWithEmailAndPassword(
      this.loginForm.getRawValue().user,
      this.loginForm.getRawValue().password
    ).then((res)=>{
      this._userSrv.setUser({uid:res.uid, email:res.email, displayName:res.displayName});
      this.setRoot();
      this.hideLoader();
    }).catch((err)=>{
      this.showError(err.message);
    })
  }

  register(){
    this.navCtrl.setRoot(RegisterPage, {}, {animate: true, direction: 'forward'});
  }
  
  setRoot(){
    this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
    this._onAuthStateChanged();
  }

  showError(message){
    let toast = this.toastCtrl.create({
      message,
      duration: 2500
    });
    toast.present();
    this.hideLoader();
  }

  showLoader(){
    this._loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this._loading.present();
  }

  hideLoader(){
    if(!isUndefined(this._loading)){
      this._loading.dismiss();
    }
  }

}
