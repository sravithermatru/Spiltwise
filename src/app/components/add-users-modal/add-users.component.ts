import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {


  users: Users[]=[];
  addUserForm:FormGroup;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {
    this.addUserForm = this.formBuilder.group({
      userName: [''],
      email: ['']
    });
  }
  addUserRequest : Users={
    usersId: 0,
    name: '',
    email: ''
  }

  addUser(){
    this.usersService.CreateUserAsync(this.addUserRequest)
    .subscribe({
      next:(response)=>{
        console.log(this.addUserRequest)
        console.log(response)
      },
      error:(response)=>{
        console.log(response)
      }
    })
  }
}
