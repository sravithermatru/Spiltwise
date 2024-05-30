import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupDetails } from 'src/app/models/group-details';
import { Groups } from 'src/app/models/groups';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit{

  addGroupForm = new FormGroup({
    groupName: new FormControl(''),
    groupDesc: new FormControl(''),
    category: new FormControl(''),
    members: new FormControl('')
  })

  constructor(
    private router : Router,
    private formBuilder :FormBuilder,
    private groupService : GroupService
  ){}

  addGroupDetailsRequest : GroupDetails ={
    name: '',
    description: '',
    category: '',
    id: 0,
    createdOn: new Date,
    createdBy: ''
  };
  addGroupRequest : Groups = {
    groupId: 0,
    groupDetails: this.addGroupDetailsRequest,
    users: []
  }


  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  addGroup(){
    this.groupService.CreateGroup(this.addGroupRequest)
    .subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(response)=>{
        console.log(response)
      }
    })
   // console.log(this.addGroupDetailsRequest);
  }
}
