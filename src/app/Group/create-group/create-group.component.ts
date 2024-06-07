import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupDetails } from 'src/app/models/group-details';
import { Groups } from 'src/app/models/groups';
import { GroupService } from 'src/app/services/group.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {


  addGroupForm: FormGroup;
  usersList: any[] = [];
  selectedMembers: any[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.addGroupForm = this.formBuilder.group({
      groupName: [''],
      groupDesc: [''],
      category: [''],
      members: this.fb.array([])
    });
  }

  addGroupDetailsRequest: GroupDetails = {
    name: '',
    description: '',
    category: '',
    id: 0,
    createdOn: new Date,
    createdBy: ''
  };
  addGroupRequest: Groups = {
    groupId: 0,
    groupDetails: this.addGroupDetailsRequest,
    users: []
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.usersService.GetUsers()
      .subscribe({
        next: (response) => {
          console.log(response.data)
          this.usersList = response.data;
        },
        error: (response) => {
          console.log(response)
        }

      })
  }


  addGroup() {
    this.addGroupRequest.users = [...this.selectedMembers];
    const groupDetails = this.addGroupForm.value;
    console.log(this.addGroupRequest);

    this.groupService.CreateGroup(this.addGroupRequest)
      .subscribe({
        next: (response) => {
          console.log(response)
        },
        error: (response) => {
          console.log(response)
        }
      })
    // console.log(this.addGroupDetailsRequest);
  }

  onCheckBoxChange(e: any) {
    const members: FormArray = this.addGroupForm.get('members') as FormArray;
    if (e.target.checked) {
      //find user object by Id
      const user = this.usersList.find(user => user.usersId == e.target.value);
      //Add to FormArray
      members.push(new FormControl(user));
      //Add to selectedMembers array
      this.selectedMembers.push(user);

    } else {
      //Remove from FromArray
      const index = members.controls.findIndex(x => x.value.usersId === e.target.value);
      members.removeAt(index);
      //Remove from selectedMembers array
      const selectedIndex = this.selectedMembers.findIndex(user => user.usersId == e.target.value);
      if (selectedIndex > -1) {
        this.selectedMembers.splice(selectedIndex, 1);
      }
    }

    console.log(this.selectedMembers);
  }
}
