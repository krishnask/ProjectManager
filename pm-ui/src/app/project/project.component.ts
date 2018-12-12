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
    this.project = new Project();
      this.project.StartDate = new Date().toISOString().substring(0, 10);
      var curDate = new Date();
      curDate.setDate(curDate.getDate() + 1);
      this.project.EndDate = curDate.toISOString().substring(0, 10);
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
  public term:string;

  ngOnInit() {
    this.buttoncaption = "Add";
    this.projectService.getProjects().subscribe(projectlist => {
      this.projects = projectlist;
     
     })
  
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
   })
}
  AddUpdateProject() {
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
   
  }
  Reset()
  {
    this.buttoncaption = "Add";
  }

  EditProject(ProjectId:number) {
    this.project = this.projects.filter(p => p.ProjectId == ProjectId)[0];
    this.buttoncaption = "Update";
    }
    SearchUser(){
      this.modalService.getModal('myModal').open();
      this.userService.getUsers().subscribe(userlist => {
        this.users = userlist;

       })
    }
    ListClick(event, newUsr){
      this.selectedUsr=newUsr;
    }
    SelectUser(){
      this.modalService.getModal('myModal').close();
      this.project.ManagerId = this.selectedUsr.EmployeeId;
      this.managerDetails = this.selectedUsr.EmployeeId.toString() + " - "+ this.selectedUsr.FirstName + " " + this.selectedUsr.LastName;

    }
    SuspendProject(pjt:Project)
    {
      console.log(pjt);
      pjt.IsSuspended = true;
      this.projectService.Put(pjt).subscribe(response => console.log(response), err => {
        this.submitErr =err.ExceptionMessage;
        console.log(this.submitErr);
      },() => this.Refresh());

    }
   
}
