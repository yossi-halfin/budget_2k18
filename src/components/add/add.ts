import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

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

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello AddComponent Component');
    this.text = 'Hello World';
  }

  add(){
    this.viewCtrl.dismiss();
  }

}
