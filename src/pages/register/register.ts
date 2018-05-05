import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { isUndefined } from 'ionic-angular/util/util';
import { HomePage } from '../home/home';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public regForm: FormGroup;
  private _loading;
  private _db: any;
  constructor(
    private _userSrv: UserProvider,
    private menu: MenuController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder, 
    private fireBase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController) {
    this.initForm();
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
  }

  initDB(uid){
    const initilize = {
      categories:[
        {id:1, label:"bike", budget:1000}
      ],
      expences:[
        {date: new Date().getTime(), label: "zee brake", amount:700}
      ],
      settings:{
        fromTo:10
      }
    }
    this._db = this.fireBase.list('users/').set(uid,initilize)
    .then((res)=>{
        ;
        this.hideLoader();
        this.setRoot();
    }).catch((res)=>{
      this.showError(res.code);

    });
  }

  initForm(){
    this.regForm = this.formBuilder.group({
      user:['', Validators.required],
      name:['', Validators.required],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
  }

  cancel(){
    this.navCtrl.setRoot(LoginPage, {}, {animate: true, direction: 'forward'});

  }

  register(){
    if(!this.regForm.valid){
      this.showError('Please Enter User & Password!');
      return;
    }
    this.showLoader()
    this.afAuth.auth.createUserWithEmailAndPassword(
      this.regForm.getRawValue().user,
      this.regForm.getRawValue().password
    ).then((res)=>{
      res.updateProfile({
        displayName: this.regForm.getRawValue().name
      }).then(()=> {
        this._userSrv.setUser({uid:res.uid, email:res.email, displayName:res.displayName});
        this.initDB(res.uid);
      }).catch((error)=> {
        this.showError(error.message);
      });
      
    }).catch((err)=>{
      console.log(err);
      this.showError(err.message);
    })
    
  }
  
  showError(message) {
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

  setRoot(){
    this.navCtrl.setRoot(HomePage, {}, {animate: true, direction: 'forward'});
  }

}
