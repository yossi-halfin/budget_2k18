import { Component, trigger, transition, animate, style, state } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ICategory } from '../../interfaces/iCat';
import { UserProvider } from '../../providers/user/user';
import { NewExpenceComponent } from '../../components/new-expence/new-expence';
import { CategoriesProvider } from '../../providers/categories/categories';
import { CommonProvider } from '../../providers/common/common';

interface IExpense{
    month:string, 
    sum:number, 
    label: string, 
    category: string, 
    id:string,categoryObject?:any, 
    amount:number
}

@Component({
  selector: 'page-home',
  animations: [
    trigger(
      'enterAnimation', [
        state('in', style({opacity: '0'})),
          transition('void => *', [
            style({opacity: '0'}),
            animate(100)
          ]),
          transition('* => void', [
            animate(100, style({opacity: '1'}))
          ])
      ]
    )
  ],
  templateUrl: 'home.html'
})
export class HomePage {
  private user;
  public categories:Array<ICategory>;
  public expenses:Array<IExpense>;
  public current_month:string;
  private subscribers;
  constructor(private commonProvider:CommonProvider,
              private modalCtrl: ModalController,
              private catProvider: CategoriesProvider,
              public navCtrl: NavController,
              private userSrv: UserProvider,
              private fireBase: AngularFireDatabase,
  ) {
    this.subscribers = [],this.categories = [];
    this.current_month = new Date().toCurrentMonthValue();
    this.user = this.userSrv.getUser();
    
  }

  ionViewDidLoad() {
    this.getCategories();
  }

  getCategories(){
    let initialize = true;
    this.commonProvider.showLoader();
    this.catProvider.getCategories().subscribe(items => {
      this.commonProvider.hideLoader();
      if(this.categories.length != items.length){
        if(initialize){
          this.getExpenses(this.current_month);
          initialize = false;
        }
        this.categories = items;
        this.catProvider.categories.next(items);
      }  
    });
  }
 
  getExpenses(date){
    let lastStatus = 0;
    this.commonProvider.showLoader();

    this.subscribers.push(this.fireBase.list(`/users/${this.user.uid}/expenses`,ref =>ref.orderByChild('month').equalTo(date))
    .snapshotChanges()
    .map(expnenses => {
      return expnenses.map(expnense => ({ $key: expnense.key,...expnense.payload.val() }));
    }).subscribe(items => {
      this.commonProvider.hideLoader();
      if(lastStatus != items.length){
        lastStatus = items.length;
        items.forEach((item)=>{
          const category = this.categories
            .find((category)=>item.category.toString() === category.id.toString());
          item.categoryObject = category;
        });
        this.expenses = this.aggregateExpenses(items);
      }
      // this.hideLoader();
    }));
  }

  aggregateExpenses(expenses : Array<IExpense>):Array<IExpense>{
    let aggregation = {};
    let aggregationArr = [];
    expenses.forEach(item => {
      if(aggregation[item.category]){
        aggregation[item.category].amount += parseInt(item.amount.toString());
        aggregation[item.category].expenses.push(item);
      }else{
        aggregation[item.category] = Object.assign(
          {},
          item.categoryObject,
          {amount:parseInt(item.amount.toString())},
          {expenses:[item]}
        )
      }
    });
    for (const key in aggregation) {
      if (aggregation.hasOwnProperty(key)) {
        if(aggregation[key].label){
          aggregationArr.push(aggregation[key]);
        }
        
      }
    }
    return aggregationArr;
  }

  addExpense(){
    let modal = this.modalCtrl.create(NewExpenceComponent);
    modal.present();
  }

  ionViewWillUnload(){
    this.subscribers.forEach(element => element.unsubscribe());
  }
}



