import { NgModule } from '@angular/core';
import { AddCategoryComponent } from './add/add';
import { IonicModule } from 'ionic-angular';
import { CategoryColorBulletComponent } from './category-color-bullet/category-color-bullet';
import { NewExpenceComponent } from './new-expence/new-expence';
import { BudgetComponent } from './budget/budget';
import { CategoryStatusComponent } from './category-status/category-status';
@NgModule({
	declarations: [
		AddCategoryComponent,
    	CategoryColorBulletComponent,
    	NewExpenceComponent,
    BudgetComponent,
    CategoryStatusComponent
	],
	imports: [
		IonicModule

	],
	entryComponents: [
		AddCategoryComponent,
		NewExpenceComponent
	],
	exports: [
		AddCategoryComponent,
    	CategoryColorBulletComponent,
    	NewExpenceComponent,
    BudgetComponent,
    CategoryStatusComponent
	]
})
export class ComponentsModule {}
