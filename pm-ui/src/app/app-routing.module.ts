import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {AppComponent} from './app.component';
import {ProjectComponent} from './project/project.component';
import {AddTaskComponent} from './add-task/add-task.component';
import {ViewTaskComponent} from './view-task/view-task.component';

const routes: Routes = [
  {path: 'project', component: ProjectComponent  },
  {path: 'addtask', component: AddTaskComponent  },
  {path: 'user', component: UserComponent},
  {path: 'viewtask', component: ViewTaskComponent},
  {path: 'edit/:id', component: AddTaskComponent  }
  //{path: '', component: AppComponent}
  ];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }


