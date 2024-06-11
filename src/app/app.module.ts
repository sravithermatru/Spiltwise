import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateGroupComponent } from './components/create-group-modal/create-group.component';
import { GroupComponent } from './components/group/group.component';
import { ExpenseComponent } from './components/add-expense-modal/expense.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUsersComponent } from './components/add-users-modal/add-users.component';
import { ExpenseDetailsModalComponent } from './components/expense-details-modal/expense-details-modal.component';
import { HomeComponent } from './components/home/home.component';

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
