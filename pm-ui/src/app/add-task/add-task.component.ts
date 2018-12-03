import {Task } from "../common/Task"
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';
import { Route } from "../../../node_modules/@angular/compiler/src/core";
import {DatePipe} from '@angular/common';

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
  buttonCaption:string;

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
  constructor(   private taskService: TaskService,
    private route: ActivatedRoute, private router : Router) {
      this.task = new Task();
     }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.buttonCaption = "Update";
         this.taskService.getTask(id).subscribe(task => 
        {
          this.task = task;
        })
      } else {
        this.navigated = false;
        this.buttonCaption = "Add";
      }
    });
  }


}
