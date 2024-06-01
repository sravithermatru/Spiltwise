import { Component, OnInit } from '@angular/core';
import { GroupDetails } from 'src/app/models/group-details';
import { Groups } from 'src/app/models/groups';
import { Users } from 'src/app/models/users';
import { GroupService } from 'src/app/services/group.service';

import * as $ from 'jquery';
import { count } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
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


  constructor(
    private groupService: GroupService,
    private usersService: UsersService
    ){}

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
    
  }
  

}

