import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import { isUndefined } from 'ionic-angular/util/util';
import { AddCategoryComponent } from '../../components/add/add';
import { ICategory } from '../../interfaces/iCat';
import { CategoriesProvider } from '../../providers/categories/categories';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  private user;
  public categories:Array<ICategory>;
  private dbRef; 
  private subscribers;
  constructor(
    private commonProvider:CommonProvider,
    private modalCtrl: ModalController,
    private catProvider: CategoriesProvider,
    private userSrv: UserProvider,
    private fireBase: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.categories = this.subscribers = [];
      this.user = this.userSrv.getUser();
      this.getCategories();
      this.dbRef = this.fireBase.list(`/users/${this.user.uid}/categories`);

      
  }
 

  getCategories(){
    this.commonProvider.showLoader();
    this.subscribers.push(this.catProvider.categories.subscribe(items => {
      this.categories = items;
      this.commonProvider.hideLoader();
    }));
  }

  addCategory(){
    let modal = this.modalCtrl.create(AddCategoryComponent);
    modal.present();
  }

  remove(item){
    this.commonProvider.showLoader();
    this.dbRef.remove(item.$key).then(()=>{
      this.commonProvider.hideLoader();
    });
  }

  ionViewWillUnload(){
    this.subscribers.forEach(element => element.unsubscribe());
  }
  
}
