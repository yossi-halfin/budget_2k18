import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import { isUndefined } from 'ionic-angular/util/util';
import { AddCategoryComponent } from '../../components/add/add';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface ICategory {id:number, label:string, budget:number}

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  private user;
  public categories:Array<ICategory>;
  private _loading;

  constructor(
    private modalCtrl: ModalController,
    private userSrv: UserProvider,
    private loadingCtrl: LoadingController,
    private fireBase: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.categories = [];
      this.user = this.userSrv.getUser();
      this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  getCategories(){
    this.showLoader();
    this.fireBase.list(`/users/${this.user.uid}/categories`).valueChanges().subscribe((res: ICategory[])=>{
      this.categories = res;
      this.hideLoader();
    });
  }

  showLoader(){
    this._loading = this.loadingCtrl.create({content: 'Please wait...'});
    this._loading.present();
  }

  hideLoader(){
    if(!isUndefined(this._loading)){
      this._loading.dismiss();
    }
  }

  addCategory(){
    let modal = this.modalCtrl.create(AddCategoryComponent);
    modal.present();
  }
  
}
