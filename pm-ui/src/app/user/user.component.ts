import { Component, OnInit } from '@angular/core';
import {User} from '../common/user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { 
   
  }
  public user: User;
  public users:User[];
  public submitErr:string;
  public buttoncaption:string
  public sortby:string;

  ngOnInit() {
    this.buttoncaption = "Add";
    this.userService.getUsers().subscribe(userlist => {
      this.users = userlist;
       console.log(this.users);
      //this.users[0]=this.user;
     })


    this.user = new User();
    this.user.FirstName = "Krishnakumar";
    this.user.LastName = "Srinivasan";
    this.user.EmployeeId = 263775;
    console.log("Read from database");
    console.log(this.users);
  }
SortById()
{
  this.sortby = "EmployeeId";
}
SortByFirstName()
{
  this.sortby = "FirstName";
}
SortByLastName()
{
  this.sortby = "LastName";
}
  AddUpdateUser() {
    console.log("Add");
    if(this.buttoncaption == "Add")
    {
      this.userService.Post(this.user).subscribe(response => console.log(response), err => {
        this.submitErr =err.ExceptionMessage;
        console.log(this.submitErr);
      });
    }
    else{
      this.userService.Put(this.user).subscribe(response => console.log(response), err => {
        this.submitErr =err.ExceptionMessage;
        console.log(this.submitErr);
      });
    }
   
    //this.Cancel(); - clear the fields - TODO
  }
  Reset()
  {
    this.buttoncaption = "Add";
  }

  EditUser(EmployeeId:number) {
    console.log("Edit");
    this.user = this.users.filter(u => u.EmployeeId == EmployeeId)[0];
    this.buttoncaption = "Update";
    }
    
    //this.Cancel(); - clear the fields - TODO
}
