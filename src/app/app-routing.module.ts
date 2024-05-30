import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { DashboardComponent } from './Home/dashboard/dashboard.component';
import { CreateGroupComponent } from './Group/create-group/create-group.component';
import { GroupComponent } from './Group/group/group.component';
import { ExpenseComponent } from './expense/expense.component';

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
