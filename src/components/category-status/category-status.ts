import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the CategoryStatusComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'category-status',
  templateUrl: 'category-status.html'
})
export class CategoryStatusComponent implements OnInit {
  @Input() data;
  public status:any;


  ngOnInit() {
    this.status = this.initStatus(this.data);
  }

  initStatus(data){
    let percentage = ((data.amount / data.budget)*100);
    percentage = parseInt(percentage.toString());
    let className;
    if(percentage < 50){
      className = {icon:"md-checkmark-circle", color:"green"};
    } else if(percentage >= 50 && percentage <= 85){
      className = {icon:"md-information-circle", color:"orange"};
    } else{
      className = {icon:"md-close-circle", color:"red"};
    }

    return {percentage,className};
  }
}
