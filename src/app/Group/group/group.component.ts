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


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupId: any = 0;
  name: string = "";
  userdata: Users[] = [];
  category: string = "";
  date: Date = new Date();

  id: any = 0;
  expenses: Expense[] = [];
  exp: ExpenseDetail[] = [];
  TotalAmount: number = 0;
  users: any[] = [];
  usersBal: Users[] = [];
  userId: number = 0;
  balData : Balance[]= [];
 

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private balanceService: BalanceService,
    private userService: UsersService) { }

  ngOnInit(): void {
    // this.groupService.GetAllGroup()
    //   .subscribe({
    //     next: (groups) => {
    //       console.log(groups);
    //     },
    //     error: (response) => {
    //       console.log(response);
    //     }
    //   });

    this.route.paramMap.subscribe({
      next: (response) => {
        this.groupId = response.get('groupId');
        const modifiedGroupId = this.groupId?.replace(/%/g, '_');
        if (this.groupId) {
          this.groupService.GetByIdAsync(this.groupId)
            .subscribe({
              next: (response) => {
                this.name = response.data.groupDetails.name;
                this.category = response.data.groupDetails.category;
                this.date = response.data.groupDetails.Date;
                this.users = response.data.users;

                //console.log(this.users);
                //  console.log(this.userId);
                for (let i of this.users)
                  if (i.usersId) {
                    this.balanceService.GetBalanceByUser(i.usersId)
                      .subscribe({
                        next: (response) => {
                          this.usersBal = response.data;
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
      }
    });
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get('groupId');
        if (this.id) {
          this.expenseService.GetExpenseByGroup(this.id)
            .subscribe({
              next: (response) => {
                this.expenses = response.data;
                //console.log(this.expenses);
                for (let i of this.expenses) {
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
    })
    // this.route.paramMap.subscribe({
    //   next:(response)=>{
    //     this.id = response.get('groupId');
    //     if(this.id){
    //       this.balanceService.GetBalanceByUser(this.id)
    //       .subscribe({
    //         next:(response)=>{
    //           this.userId=response.data.users;
    //           console.log(this.userId);
    //         },
    //         error:(response)=>{
    //           console.log(response);
    //         }
    //       })
    //     }
    //   }
    // })
    this.route.paramMap.subscribe({
      next: (response) => {
        this.id = response.get('groupId');

        if (this.id) {
          this.userService.GetUserByGroup(this.id)

            .subscribe({
              next: (response) => {
                this.userdata = response.data;
                //console.log(this.userName);
                // this.userId  = response.data.usersId;
                // console.log(this.userId)
                for (var i of this.userdata) {
                  console.log(i.usersId);
                  this.userId = i.usersId;
                  this.balanceService.GetBalanceByUser(this.userId)
                    .subscribe({
                      next: (response) => {
                        this.balData = response.data;
                        console.log(this.balData);
                      }
                    })
                }
              },
              error: (response) => {
                console.log(response);
              }
            })
        }

      }
    })

  }
}
