import { Task } from "../common/Task"
import { User } from "../common/user"
import { Project } from "../common/project"
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Route } from "../../../node_modules/@angular/compiler/src/core";
import { DatePipe } from '@angular/common';
import { UserService } from '../user.service';
import { ProjectService } from '../project.service'
import { NgxSmartModalService } from 'ngx-smart-modal';


@Component({
  selector: 'app-update-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Input() task: Task;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here
  buttonCaption: string;

  AddUpdate() {
    this.taskService.Save(this.task).subscribe(response => console.log(response), err => console.log(err));
    this.Cancel();
  }

  Cancel() {

    /*if(this.navigated =true)
    {
      const url = '../../view';
      this.router.navigate([url]);
    }
    else{
      const url = '../view';
      this.router.navigate([url]);
    }   */
  }
  constructor(private taskService: TaskService, private projectService: ProjectService, private userService: UserService,
    private route: ActivatedRoute, private modalService: NgxSmartModalService, private router: Router) {
    this.task = new Task();
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.buttonCaption = "Update";
        this.taskService.getTask(id).subscribe(task => {
          this.task = task;
        })
      } else {
        this.navigated = false;
        this.buttonCaption = "Add";
      }
    });
    this.task = new Task();
    this.task.Priority = 0;
    this.task.StartDate = new Date().toISOString().substring(0, 10);
    var curDate = new Date();
    curDate.setDate(curDate.getDate() + 1);
    this.task.EndDate = curDate.toISOString().substring(0, 10);
    this.task.IsParentTask = true;
  }

  // Variables for selection
  users: User[];
  projects: Project[];
  parents: Task[];
  selectedUsr: User;
  selectedPar: Task;
  selectedPjt: Project;
  projectDetails: string;
  parentDetails: string;
  userDetails: string;


  // end variables for selection

  SearchProject() {
    this.modalService.getModal('pjtModal').open();
    this.projectService.getProjects().subscribe(projectlist => {
      this.projects = projectlist;

    })
  }

  ClickPjt(event, newPjt) {
    this.selectedPjt = newPjt;
  }
  SelectProject() {
    this.modalService.getModal('pjtModal').close();
    this.task.ProjectId = this.selectedPjt.ProjectId;
    this.projectDetails = this.selectedPjt.ProjectId.toString() + " - " + this.selectedPjt.ProjectName;

  }


  SearchParent() {
    this.modalService.getModal('parModal').open();
    this.taskService.getTasks().subscribe(tasklist => {
      this.parents = tasklist.filter(task => task.IsParentTask)

    })
  }
  ClickPar(event, newPar) {
    this.selectedPar = newPar;
  }
  SelectParent() {
    this.modalService.getModal('parModal').close();
    this.task.ParentTask = this.selectedPar.TaskId;
    this.parentDetails = this.selectedPar.TaskId.toString() + " - " + this.selectedPar.TaskName;
  }
  SearchUser() {
    this.modalService.getModal('usrModal').open();
    this.userService.getUsers().subscribe(userlist => {
      this.users = userlist;
    })
  }
  ClickUsr(event, newUsr) {
    this.selectedUsr = newUsr;
  }
  SelectUser() {
    this.modalService.getModal('usrModal').close();
    this.task.UserId = this.selectedUsr.EmployeeId;
    this.userDetails = this.selectedUsr.EmployeeId.toString() + " - " + this.selectedUsr.FirstName + " " + this.selectedUsr.LastName;

  }
}

