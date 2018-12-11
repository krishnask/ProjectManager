import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Project } from './Common/project';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }
  taskUrl: string = 'assets/tasks.json';

  public getProjects()
  {
    return this.http.get<Project[]>(environment.projectUrl)
    .pipe(map(data => 
      {
        return data;
      }
     
      ), catchError(this.handleError));
  }
  public getProject(EmployeeId:number):Observable<Project>
  {
    return this.getProjects().pipe(
      map(tasks => tasks.find(project => project.ProjectId === EmployeeId))
    );
  }
 public Save(project:Project)
 {
   if(project.ProjectId)
   {
      return this.Put(project);
   }
   else{
     return this.Post(project);
   }
 }
 public Put(project:Project)
 {
  const httpOptions = {
    headers : new HttpHeaders({
     'Content-Type': 'application/json'
   })
 };

 var body = JSON.stringify(project);
 const url = `${environment.projectUrl}/${project.ProjectId}`;
  return this.http
    .put(url, body, httpOptions)
    .pipe(catchError(this.handleError));

 }
 // Add New Task
 public Post(project:Project)
 {
   const httpOptions = {
   headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
  var body = JSON.stringify(project);
  
  return this.http
    .post(environment.projectUrl, body,httpOptions)
    .pipe(catchError(this.handleError));
 }
  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
