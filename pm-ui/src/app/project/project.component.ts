import { Component, OnInit } from '@angular/core';
import {Project} from '../common/project';
import {ProjectService} from '../project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService) { 
   
  }
  public project: Project;
  public projects:Project[];
  public submitErr:string;
  public buttoncaption:string
  public sortby:string;

  ngOnInit() {
    this.buttoncaption = "Add";
    this.projectService.getProjects().subscribe(projectlist => {
      this.projects = projectlist;
       console.log(this.projects);
      //this.projects[0]=this.project;
     })


    this.project = new Project();
  /*  this.project.FirstName = "Krishnakumar";
    this.project.LastName = "Srinivasan";
    this.project.ProjectId = 263775;*/
    console.log("Read from database");
    console.log(this.projects);
  }
SortById()
{
  this.sortby = "ProjectId";
}
SortByFirstName()
{
  this.sortby = "FirstName";
}
SortByLastName()
{
  this.sortby = "LastName";
}
  AddUpdateProject() {
    console.log("Add");
    if(this.buttoncaption == "Add")
    {
      this.projectService.Post(this.project).subscribe(response => console.log(response), err => {
        this.submitErr =err.ExceptionMessage;
        console.log(this.submitErr);
      });
    }
    else{
      this.projectService.Put(this.project).subscribe(response => console.log(response), err => {
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

  EditProject(ProjectId:number) {
    console.log("Edit");
    this.project = this.projects.filter(p => p.ProjectId == ProjectId)[0];
    this.buttoncaption = "Update";
    }
    
    //this.Cancel(); - clear the fields - TODO
}
