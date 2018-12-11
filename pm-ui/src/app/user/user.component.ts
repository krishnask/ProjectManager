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
  public sortBy:string;
  public term:string;

  ngOnInit() {
    this.buttoncaption = "Add";
    this.userService.getUsers().subscribe(userlist => {
      this.users = userlist;
     })


    this.user = new User();
  
  }
SortById()
{
  this.sortBy = "EmployeeId";
  console.log(this.sortBy);
}
SortByFirstName()
{
  this.sortBy = "FirstName";
}
SortByLastName()
{
  this.sortBy = "LastName";
}
  AddUpdateUser() {
    console.log (this.user);
    console.log("Add");
    if(this.buttoncaption == "Add")
    {
      this.userService.Post(this.user).subscribe(response => console.log(response), err => {
        this.submitErr =err.ExceptionMessage;
        console.log(this.submitErr);

        this.Refresh();
      }, () => this.Refresh());
    }
    else{
      this.userService.Put(this.user).subscribe(response => console.log(response), err => {
        this.submitErr =err.ExceptionMessage;
        console.log(this.submitErr);
        this.Refresh();
       
      }, () => this.Refresh());
    }
   
  }
  Refresh()
  {
    this.userService.getUsers().subscribe(userlist => {
      this.users = userlist;
       console.log(this.users);
     })
  }

  Reset()
  {
    this.buttoncaption = "Add";
  }
  DeleteUser(employeeId:number)
  {
    this.userService.Delete(employeeId).subscribe(response => console.log(response), err => {
      this.submitErr =err.ExceptionMessage;
      console.log(this.submitErr);
    }, () => this.Refresh());
  }

  EditUser(employeeId:number) {
    console.log("Edit");
    this.user = Object.create(this.users.filter(u => u.EmployeeId == employeeId)[0]);
    this.user = this.users.filter(u => u.EmployeeId == employeeId)[0];
    console.log("Before Editing");
    console.log(this.user);
    console.log("Before actual edit");
    this.buttoncaption = "Update";
    }
    
    //this.Cancel(); - clear the fields - TODO
}
