import { Injectable } from '@angular/core';
import { HttpClient,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from './Common/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  taskUrl: string = 'assets/tasks.json';

  public getTasks()
  {
    console.log("Get Tasks");
    return this.http.get<User[]>(environment.userUrl)
    .pipe(map(data => 
      {
        return data;
      }
     
      ), catchError(this.handleError));
  }
  public getTask(EmployeeId:number):Observable<User>
  {
    return this.getTasks().pipe(
      map(tasks => tasks.find(user => user.EmployeeId === EmployeeId))
    );
  }
 public Save(user:User)
 {
   console.log("Save");
   if(user.EmployeeId)
   {
     console.log("put");
      return this.Put(user);
   }
   else{
    console.log("post");
     return this.Post(user);
   }
 }
 public Put(user:User)
 {
  const httpOptions = {
    headers : new HttpHeaders({
     'Content-Type': 'application/json'
   })
 };

 var body = JSON.stringify(user);
 const url = `${environment.userUrl}/${user.EmployeeId}`;
console.log(url);
console.log(body);
  return this.http
    .put(url, body, httpOptions)
    .pipe(catchError(this.handleError));

 }
 // Add New Task
 public Post(user:User)
 {
   const httpOptions = {
   headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
  var body = JSON.stringify(user);
  
  return this.http
    .post(environment.userUrl, body,httpOptions)
    .pipe(catchError(this.handleError));
 }
  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
