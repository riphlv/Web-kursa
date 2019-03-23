import { Injectable, NgModule } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tokenKey } from '@angular/core/src/view';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) { }
  registerUser(user): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    return this.http.post('http://localhost:8080/users/register', user, options);
  }
  authUser(user): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers };
    return this.http.post('http://localhost:8080/users/auth', user, options);
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }
  logoutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn() {
    const token = localStorage.getItem('id_token');
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }
}
