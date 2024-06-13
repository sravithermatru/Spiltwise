import { Component, OnInit } from '@angular/core';
import { Expense } from 'src/app/models/expense';
import { GroupService } from 'src/app/services/group.service';
import { ActivatedRoute } from '@angular/router';
import { GroupDetails } from 'src/app/models/group-details';
import { Users } from 'src/app/models/users';
import { ExpenseService } from 'src/app/services/expense.service';
import { ExpenseDetail } from 'src/app/models/expense-detail';
import { BalanceService } from 'src/app/services/balance.service';
import { error } from 'jquery';
import { UsersService } from 'src/app/services/users.service';
import { Balance } from 'src/app/models/balance';
import { FormBuilder, FormGroup } from '@angular/forms';

interface UserBalance {
  name: string;
  balance: number;
}


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupId: any = 0;
  name: string = "";
  users: any[] = [];
  category: string = "";
  date: Date = new Date();


  userdata: Users[] = [];

  id: any = 0;
  expenses: Expense[] = [];
  exp: ExpenseDetail[] = [];
  TotalAmount: number = 0;

  usersBal: Users[] = [];
  userId: number = 0;
  balData: number = 0;

  addExpForm: FormGroup;

  userBalances: UserBalance[] = [];
  filteredBalances: any[] = [];
  selectedExpense: any;

  constructor(
    private groupService: GroupService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private balanceService: BalanceService,
    private userService: UsersService) {
    this.addExpForm = this.formBuilder.group({
      title: [''],
      desc: [''],
      amount: ['']
    });
  }


  addExpDetailsRequest: ExpenseDetail = {
    id: 0,
    expenseId: 0,
    title: '',
    amount: 0,
    description: '',
    createdOn: new Date
  }

  addExpRequest: Expense = {
    expenseId: 0,
    groupId: 0,
    usersPaid: [],
    usersInvolved: [],
    expenseDetails: this.addExpDetailsRequest
  }


  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: (response) => {
        //geting the groupId of the group opened
        this.groupId = response.get('groupId');
        const modifiedGroupId = this.groupId?.replace(/%/g, '_');


        if (this.groupId) {
          this.groupService.GetByIdAsync(this.groupId)
            .subscribe({
              next: (response) => {
                //getting group details
                this.name = response.data.groupDetails.name;
                this.category = response.data.groupDetails.category;
                this.date = response.data.groupDetails.Date;
                this.users = response.data.users;

                //console.log(this.users);
                //  console.log(this.userId);
                for (let i of this.users)
                  if (i.usersId) 
                  {
                    this.balanceService.GetBalanceByUser(i.usersId)
                      .subscribe({
                        //Getting balance of every users
                        next: (response) => {
                          this.usersBal = response.data;
                          //console.log(response.data.usersId);
                          //console.log(this.usersBal);
                        },
                        error: (response) => {
                          console.log(response);
                        }
                      })
                  }
                },
              error: (response) => {
                console.log(response)
              }
            });
        }

        if (this.groupId) {
          this.expenseService.GetExpenseByGroup(this.groupId)
            .subscribe({

              //getting all the expenses of the group
              next: (response) => {
                this.expenses = response.data;
                console.log(this.expenses);
                for (let i of this.expenses) {
                  //calculating the total expense
                  this.TotalAmount = this.TotalAmount + i.expenseDetails.amount;

                }
                //console.log(this.TotalAmount);
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      }
    });



    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get('groupId');


        if (this.id) {
          this.userService
            .GetUserByGroup(this.id)
            .subscribe({
              next: (response) => {
                this.userdata = response.data;
                //console.log(this.userName);
                // this.userId  = response.data.userId;

                this.loadUserBalances(this.userdata);
              },
              error: (response) => {
                console.log(response);
              },
            });
        }
      },
    });
  }

  // addExp(){
  //   this.expenseService.AddExpense(this.addExpRequest)
  //   .subscribe({
  //     next:(response)=>{

  //     }
  //   })
  // }

  viewExpenseModal(expense: any) {
    this.selectedExpense = expense;
  }

  closeModal() {
    this.selectedExpense = null;
  }


  loadUserBalances(userData: any[]): void {

    console.log(userData);


    this.balanceService.GetBalances()
      .subscribe((balances: any) => {
        console.log('Balances:', balances);
        for (var user of userData) {
          for (var balance of balances.data) {
            if (user.usersId == balance.usersId) {
              this.filteredBalances = this.filteredBalances.concat(balance);
            }
          }

        }
        console.log(this.filteredBalances);
        this.userBalances = this.margeUserBalance(userData, this.filteredBalances);
        //  console.log(this.userBalances);

      },
      );

  }
  margeUserBalance(users: any[], balances: any[]): UserBalance[] {
    if (!Array.isArray(users)) {
      console.error('Expected arrays for users and balances');
      return [];
    }
    if (!Array.isArray(balances)) {
      console.log("error")
    }
    return balances.map((balance: Balance) => {
      const user = users.find((u: Users) => u.usersId === balance.usersId);
      return {
        name: user ? user.name : "Unknown",
        balance: balance.amount
      }
    })
  }
}
