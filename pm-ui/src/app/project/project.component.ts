import { Component, OnInit } from '@angular/core';
import {Project} from '../common/project';
import {ProjectService} from '../project.service';
import {User} from '../common/user';
import {UserService} from '../user.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService, private userService: UserService, private modalService: NgxSmartModalService) { 
   
  }
  public project: Project;
  public projects:Project[];
  public submitErr:string;
  public buttoncaption:string
  public sortby:string;
  public users: User[];
  public setDate:boolean;
  public selectedUsr:User;
  public managerDetails:string;

  ngOnInit() {
    this.buttoncaption = "Add";
    this.projectService.getProjects().subscribe(projectlist => {
      this.projects = projectlist;
      console.log ("Project list in inginit of project component")
       console.log(this.projects);
       console.log ("done dumping")
      //this.projects[0]=this.project;
     })


    this.project = new Project();
    this.project.ProjectName = "CMI";
    this.project.Priority = 25;
    this.project.ManagerId = 263775;
    this.project.StartDate = new Date().toISOString().substring(0,10);
    var curDate = new Date();
    curDate.setDate(curDate.getDate()+1);
    this.project.EndDate = curDate.toISOString().substring(0,10);
    console.log("Read from database");
    console.log(this.projects);
  }
SortByStartDate()
{
  this.sortby = "StartDate";
}
SortByEndDate()
{
  this.sortby = "EndDate";
}
SortByPriority()
{
  this.sortby = "Priority";
}
SortByCompleted()
{
  this.sortby = "IsSuspended";
}
Refresh()
{
  this.projectService.getProjects().subscribe(projectlist => {
    this.projects = projectlist;
     console.log(this.projects);
   })
}
  AddUpdateProject() {
    console.log("Add");
    console.log(this.project);
    if(this.buttoncaption == "Add")
    {

      this.projectService.Post(this.project).subscribe(response => console.log(response), err => {
        this.submitErr =err.ExceptionMessage;
        console.log(this.submitErr);
      },() => this.Refresh());
    }
    else{
      this.projectService.Put(this.project).subscribe(response => console.log(response), err => {
        this.submitErr =err.ExceptionMessage;
        console.log(this.submitErr);
      },() => this.Refresh());
    }
   
    //this.Cancel(); - clear the fields - TODO
  }
  Reset()
  {
    this.buttoncaption = "Add";
  }

  EditProject(ProjectId:number) {
   // console.log("Edit");
    this.project = this.projects.filter(p => p.ProjectId == ProjectId)[0];
    this.buttoncaption = "Update";
    }
    SearchUser(){
      this.modalService.getModal('myModal').open();
      this.userService.getUsers().subscribe(userlist => {
        this.users = userlist;
         //console.log(this.users);
         //console.log ("*****************************88")
        //this.projects[0]=this.project;
       })
    }
    ListClick(event, newUsr){
      //console.log(newUsr);
      this.selectedUsr=newUsr;
    }
    SelectUser(){
      this.modalService.getModal('myModal').close();
      this.project.ManagerId = this.selectedUsr.EmployeeId;
      this.managerDetails = this.selectedUsr.EmployeeId.toString() + " - "+ this.selectedUsr.FirstName + " " + this.selectedUsr.LastName;
      //console.log(this.managerDetails);

    }
   
    //this.Cancel(); - clear the fields - TODO
}
