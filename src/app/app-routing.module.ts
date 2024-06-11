import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateGroupComponent } from './components/create-group-modal/create-group.component';
import { GroupComponent } from './components/group/group.component';
import { ExpenseComponent } from './components/add-expense-modal/expense.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"",component:HomeComponent },
  {path:"dashboard", component:DashboardComponent},
  {path:"Createform", component:CreateGroupComponent},
  {path:"group", component:GroupComponent},
  {path:"group/:groupId", component:GroupComponent},
  {path:"expense",component:ExpenseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
