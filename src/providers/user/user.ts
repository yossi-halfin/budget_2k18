import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private user:{uid:string, email:string, displayName:string};
  constructor() {
    console.log('Hello UserProvider Provider');
  }

  setUser(user){
    this.user = user; 
  }

  getUser(){
    return this.user;
  }
}
