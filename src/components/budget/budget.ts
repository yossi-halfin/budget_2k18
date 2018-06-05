import { Component, Input } from '@angular/core';

/**
 * Generated class for the BudgetComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'budget',
  templateUrl: 'budget.html'
})
export class BudgetComponent {

  @Input() budget: string;

 

}
