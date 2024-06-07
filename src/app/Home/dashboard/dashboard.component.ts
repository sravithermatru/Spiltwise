import { Component, OnInit } from '@angular/core';
import { GroupDetails } from 'src/app/models/group-details';
import { Groups } from 'src/app/models/groups';
import { Users } from 'src/app/models/users';
import { GroupService } from 'src/app/services/group.service';

import * as $ from 'jquery';
import { count } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
//
$('#elemId').width();


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  // groupDetails: GroupDetails={
  //   id: 0,
  //   name: '',
  //   description: '',
  //   category: '',
  //   createdOn: new Date,
  //   createdBy: ''
  // }
  groupDetails : GroupDetails[]=[];
  groups: Groups[]=[];
  users: Users[]=[];
  groupId: number = 0
  numberOfGroup: number = 0;
  numberOfUsers: number = 0;
  addUserForm:FormGroup;

  
  addGroupForm:FormGroup;
  usersList:any[]=[];
  selectedMembers:any[]=[];



  constructor(
    private groupService: GroupService,
    private usersService: UsersService,
    private formBuilder :FormBuilder,
    private fb: FormBuilder
    ){
      this.addUserForm = this.formBuilder.group({
        userName:[''],
        email:['']
      });

      
    this.addGroupForm = this.formBuilder.group({
      groupName: [''],
      groupDesc: [''],
      category: [''],
      members: this.fb.array([])
    });
    }

    addUserRequest : Users={
      usersId: 0,
      name: '',
      email: ''
    }

    
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
    this.groupService.GetAllGroup()
    .subscribe({
      next:(response)=>{
        this.groups = response.data;
        this.numberOfGroup= this.groups.length;
        console.log(this.groups);  
      },
      error:(response)=>{
        console.log(response);
      }
    });

    this.usersService.GetUsers()
    .subscribe({
      next:(response)=>{
        this.users = response.data;
        this.numberOfUsers = this.users.length;
      },
      error:(response)=>{
        console.log(response)
      }
    });
    
    var carouselWidth = $(".carousel-inner")[0].scrollWidth;
    var cardWidth:any = $(".carousel-item").width();
    var scrollPosition = 0;
    $(".carousel-control-next").on("click", function () {
     //check if you can go any further
        scrollPosition += cardWidth;  
        console.log(carouselWidth)
        console.log(cardWidth);
        console.log(scrollPosition);//update scroll position
        $(".carousel-inner").animate({ scrollLeft: scrollPosition },1200); //scroll left
      
    });
    $(".carousel-control-prev").on("click", function () {
      // if (scrollPosition > 0) {
        scrollPosition -= cardWidth;
        $(".carousel-inner").animate(
          { scrollLeft: scrollPosition },
          1200
        );
      // }
    });


    
    //throw new Error('Method not implemented.');
    this.usersService.GetUsers()
    .subscribe({
      next:(response)=>{
        console.log(response.data)
        this.usersList=response.data;
      },
      error:(response)=>{
        console.log(response)
      }

    })
    
  }

  addUser(){
    this.usersService.CreateUserAsync(this.addUserRequest)
    .subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(response)=>{
        console.log(response)
      }
    })
  }
  

  addGroup(){
    this.addGroupRequest.users=[...this.selectedMembers];
    const groupDetails= this.addGroupForm.value;
    console.log(this.addGroupRequest);

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

  onCheckBoxChange(e:any){
    const members:FormArray=this.addGroupForm.get('members') as FormArray;
    if(e.target.checked){
      //find user object by Id
      const user=this.usersList.find(user=>user.userId==e.target.value);
      //Add to FormArray
      members.push(new FormControl(user));
      //Add to selectedMembers array
      this.selectedMembers.push(user);
 
    }else{
      //Remove from FromArray
      const index=members.controls.findIndex(x=>x.value.userId===e.target.value);
      members.removeAt(index);
      //Remove from selectedMembers array
      const selectedIndex=this.selectedMembers.findIndex(user=>user.userId==e.target.value);
      if(selectedIndex>-1)
      {
        this.selectedMembers.splice(selectedIndex,1);
      }
    }
 
    console.log(this.selectedMembers);
  }
}
