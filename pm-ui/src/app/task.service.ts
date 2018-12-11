import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Task } from './Common/task';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  taskUrl: string = 'assets/tasks.json';

  public getTasks()
  {
    return this.http.get<Task[]>(environment.taskUrl)
    .pipe(map(data => 
      {
        return data;
      }
     
      ), catchError(this.handleError));
  }
  public getTask(EmployeeId:number):Observable<Task>
  {
    return this.getTasks().pipe(
      map(tasks => tasks.find(task => task.TaskId === EmployeeId))
    );
  }
 public Save(task:Task)
 {
   if(task.TaskId)
   {
      return this.Put(task);
   }
   else{
     return this.Post(task);
   }
 }
 public Put(task:Task)
 {
  const httpOptions = {
    headers : new HttpHeaders({
     'Content-Type': 'application/json'
   })
 };

 var body = JSON.stringify(task);
 const url = `${environment.taskUrl}/${task.TaskId}`;
  return this.http
    .put(url, body, httpOptions)
    .pipe(catchError(this.handleError));

 }
 // Add New Task
 public Post(task:Task)
 {
   const httpOptions = {
   headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
  var body = JSON.stringify(task);
  
  return this.http
    .post(environment.taskUrl, body,httpOptions)
    .pipe(catchError(this.handleError));
 }
  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
