import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Users } from 'src/app/models/users';

@Component({
  selector: 'app-expense-details-modal',
  templateUrl: './expense-details-modal.component.html',
  styleUrls: ['./expense-details-modal.component.css']
})
export class ExpenseDetailsModalComponent implements OnInit {

  @Input() expense:any;
  @Output() close = new EventEmitter<void>()
  
  
  userInv : Users[] =[]


  ngOnInit(): void {
    console.log(this.expense);

    this.userInv= this.expense.usersInvolved;
    console.log(this.userInv);
  }
  
  closeModal(){
    this.close.emit();
   }

}
