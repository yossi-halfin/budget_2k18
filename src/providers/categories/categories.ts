import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import { ICategory } from '../../interfaces/iCat';
import { UserProvider } from '../user/user';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the CategoriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoriesProvider {
  private user;
  public categories = new ReplaySubject<ICategory[]>();
  
  /**
   *
   */
  constructor(private userSrv: UserProvider,
    private fireBase: AngularFireDatabase) {
    this.user = this.userSrv.getUser();
  }

  getCategories(){
    return this.fireBase.list(`/users/${this.user.uid}/categories`)
    .snapshotChanges().map(categories => {
      return categories.map(category => ({ $key: category.key,...category.payload.val() }));
    });
  }
}
