import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user/user.component';
import {AppComponent} from './app.component';

const routes: Routes = [
 // {path: 'addproject', component: ProjectComponent  },
 // {path: 'addtask', component: AddTaskComponent  },
  {path: 'user', component: UserComponent},
 // {path: 'viewtask', component: ViewTaskComponent}
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


