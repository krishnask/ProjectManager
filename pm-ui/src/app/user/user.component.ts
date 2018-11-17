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
  public submitErr:string;

  ngOnInit() {
    this.user = new User();
    this.user.FirstName = "Krishnakumar";
    this.user.LastName = "Srinivasan";
    this.user.EmployeeId = 263775;
  }
  

  AddUpdate() {
    console.log("Addupdate");
    this.userService.Post(this.user).subscribe(response => console.log(response), err => {

      this.submitErr =err.Message;
      console.log(this.submitErr);
    }
    
    );
    //this.Cancel(); - clear the fields - TODO

  }
}
