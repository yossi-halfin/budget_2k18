import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserProvider } from '../../providers/user/user';
import { CommonProvider } from '../../providers/common/common';

/**
 * Generated class for the AddComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add',
  templateUrl: 'add.html'
})
export class AddCategoryComponent {
  form: FormGroup;
  dbRef;
  private user;

  constructor(
    private commonProvider: CommonProvider,
    private fireBase: AngularFireDatabase,
    public viewCtrl: ViewController,
    private userSrv: UserProvider,
    private _fb:FormBuilder) { 
    
    this.user = this.userSrv.getUser();
    this.initForm();
    this.dbRef = this.fireBase.list(`/users/${this.user.uid}/categories`);

  }

  add(){
    const ref = this.dbRef.push(this.form.getRawValue());
    ref.update({ id: ref.key });
    this.close();
  }

  close(){
    this.viewCtrl.dismiss();
  }

  initForm(){
    this.form = this._fb.group({
      label:[null],
      color:['red'],
      budget:[0]
    });
  }


}
