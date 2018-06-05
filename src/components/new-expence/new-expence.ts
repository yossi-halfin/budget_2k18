import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { ViewController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { ICategory } from '../../interfaces/iCat';
import '../../interfaces/Date';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the NewExpenceComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'new-expence',
  templateUrl: 'new-expence.html'
})
export class NewExpenceComponent {

  form: FormGroup;
  dbRef;
  categories:Array<ICategory>;
  private user;
  private subscribers;

  constructor(
    private commonProvider: CommonProvider,
    private fireBase: AngularFireDatabase,
    public viewCtrl: ViewController,
    private userSrv: UserProvider,
    private _fb:FormBuilder) { 
      this.subscribers = [];
      this.initForm();
      this.user = this.userSrv.getUser();
      this.getCategories();
      this.dbRef = this.fireBase.list(`/users/${this.user.uid}/expenses`);

  }

  add(){
    const ref = this.dbRef.push(Object.assign({},{
      month:new Date(this.form.getRawValue().date).toCurrentMonthValue()},
      this.form.getRawValue()));
    ref.update({ id: ref.key });
    this.close();
  }

  close(){
    this.viewCtrl.dismiss();
  }

  initForm(){
    this.form = this._fb.group({
      label:[null,[Validators.required]],
      category:[null,[Validators.required]],
      date:[new Date().toDateInputValue(),[Validators.required]],
      amount:[10]
    });
  }

  getCategories(){
    this.commonProvider.showLoader();
    this.subscribers.push(this.fireBase.list(`/users/${this.user.uid}/categories`)
    .snapshotChanges().map(categories => {
      return categories.map(category => ({ $key: category.key,...category.payload.val() }));
    }).subscribe(items => {
      this.categories = items;
      this.commonProvider.hideLoader();
    }));
  }

  ionViewWillUnload(){
      this.subscribers.forEach(element => element.unsubscribe());
  }

}
