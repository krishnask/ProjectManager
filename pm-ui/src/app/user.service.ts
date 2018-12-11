import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from './Common/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  taskUrl: string = 'assets/tasks.json';

  private refreshData() {
    this.getUsers();
  }
  public getUsers() {
    return this.http.get<User[]>(environment.userUrl)
      .pipe(map(data => {
        return data;
      }

      ), catchError(this.handleError));
  }
  public getUser(employeeId: number): Observable<User> {
    return this.getUsers().pipe(
      map(tasks => tasks.find(user => user.EmployeeId === employeeId))
    );
  }
  public Save(user: User) {
    if (user.EmployeeId) {
      this.Put(user);
    }
    else {
      this.Post(user);
    }
    return this.getUsers();
  }
  public Put(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var body = JSON.stringify(user);
    const url = `${environment.userUrl}/${user.EmployeeId}`;
    return this.http
      .put(url, body, httpOptions)
      .pipe(catchError(this.handleError));

  }
// delete user
  public Delete(employeeId:number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const url = `${environment.userUrl}/${employeeId}`;
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError));

  }
  // Add New Task
  public Post(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    var body = JSON.stringify(user);

    return this.http
      .post(environment.userUrl, body, httpOptions)
      .pipe(catchError(this.handleError));
  }

   

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
