import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {DatePipe} from '@angular/common';

import {Task} from '../common/task';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  constructor(private dal:TaskService , private router: Router) { }
  //Delete me ASAP
public tasks:Task[];
public EditTask(TaskId:number):void{
  const link = '../edit/'+ TaskId;
  this.router.navigate([link]);
}
public EndTask(task:Task):void{
  console.log("EndTask");
  console.log(task);
  task.IsCompleted = true;
  
 this.dal.Save(task).subscribe(response => console.log(response), err => console.log(err));

 this.tasks = this.tasks.filter(t => t.TaskId !== task.TaskId);
}
  ngOnInit() { 
       this.dal.getTasks().subscribe(task => {
         this.tasks = task;
        }
        );
  }
 
}