import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense';
import { ExpenseService } from '../services/expense.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ExpenseDetail } from '../models/expense-detail';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  expense : Expense[] = [];
  groupId : number = 10;
  member : any = "";

  addExpenseForm = new FormGroup({
    expTitle: new FormControl(''),
    expDesc: new FormControl(''),
    amount: new FormControl(''),
    paidBy : new FormControl(''),
    splitAmong : new FormControl('')

  })
   addExpenseDetailRequest : ExpenseDetail ={
    id: 0,
    expenseId: 0,
    title: '',
    amount: 0,
    description: '',
    createdOn: new Date
  }
  addExpenseRequest : Expense = {
    expenseId: 0,
    groupId: 0,
    usersPaid: [],
    usersInvolved: [],
    expenseDetails: this.addExpenseDetailRequest
  }

  constructor(private expenseService: ExpenseService, private usersService: UsersService){}


  ngOnInit(): void {

    this.usersService.GetUserByGroup(this.groupId)
    .subscribe({
      next:(response)=>{
        console.log(response);
      },
      error:(response)=>{
        console.log(response);
      }
    });

    this.expenseService.GetExpenseAsync()
    .subscribe({
      next:(response)=>{
        console.log(response);
      },
      error:(response)=>{
        console.log(response);
      }
    });

    this.expenseService.GetExpenseByGroup(this.groupId)
    .subscribe({
      next:(response)=>{
        console.log(response);
      },
      error:(response)=>{
        console.log(response);
      }
    });
}


// addExpense(){
//   this.expenseService.AddExpense(this.addExpenseRequest)
//   .subscribe({
//     next:(response)=>{
//       console.log(response);
//     },
//     error:(response)=>{
//       console.log(response);
//     }
//   });
}

