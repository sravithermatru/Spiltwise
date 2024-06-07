import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home/home.component';
import { DashboardComponent } from './Home/dashboard/dashboard.component';
import { CreateGroupComponent } from './Group/create-group/create-group.component';
import { GroupComponent } from './Group/group/group.component';
import { ExpenseComponent } from './expense/expense.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AddUsersComponent } from './Group/add-users/add-users.component';
import { ExpenseDetailsModalComponent } from './components/expense-details-modal/expense-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    CreateGroupComponent,
    GroupComponent,
    ExpenseComponent,
    AddUsersComponent,
    ExpenseDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
