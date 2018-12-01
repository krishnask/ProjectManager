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

  private refreshData()
  {
    this.getUsers();
  }
  public getUsers()
  {
    console.log("Get Users");
    return this.http.get<User[]>(environment.userUrl)
    .pipe(map(data => 
      {
        console.log(data);
        return data;
      }
     
      ), catchError(this.handleError));
  }
  public getUser(UserId:number):Observable<User>
  {
    return this.getUsers().pipe(
      map(tasks => tasks.find(user => user.UserId === UserId))
    );
  }
 public Save(user:User)
 {
   console.log("Save");
   if(user.UserId)
   {
     console.log("put");
      this.Put(user);
   }
   else{
    console.log("post");
     this.Post(user);
   }
   return this.getUsers();
 }
 public Put(user:User)
 {
  const httpOptions = {
    headers : new HttpHeaders({
     'Content-Type': 'application/json'
   })
 };

 var body = JSON.stringify(user);
 const url = `${environment.userUrl}/${user.UserId}`;
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
