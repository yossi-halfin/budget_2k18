import { Component, Input } from '@angular/core';
/**
 * Generated class for the CategoryColorBulletComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'category-color-bullet',
  templateUrl: 'category-color-bullet.html'
})
export class CategoryColorBulletComponent {

  @Input('color') color;


}
