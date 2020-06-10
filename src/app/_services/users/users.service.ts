import { Injectable } from '@angular/core';
import { User } from 'src/app/_models/Users';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  formData: User;

  constructor(private http: HttpClient) { }

  /*===== user Token ==========*/

  userToken = localStorage.getItem("currentUser");

  /*=====the headers that need to be sent in each http request ==========*/

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      token: this.userToken
    })
  };

  /*===== fetch all users ==========*/

  fetchAllUsers(page) {
    return this.http.get(`https://reqres.in/api/users?page=${page}`, this.httpOptions);
  }

 /*===== create new user ==========*/

  createUser(user) {
    return this.http.post(`https://reqres.in/api/users`,
      {
        name: user.first_name + ' ' + user.last_name,
        email: user.email
      }, this.httpOptions);
  }

 /*===== update existing user ==========*/

  UpdateUser(user, id) {
    return this.http.post(`https://reqres.in/api/users/${id}`, {
      name: user.first_name + ' ' + user.last_name,
      email: user.email
    }, this.httpOptions);
  }

 /*===== fetch existing user ==========*/

  deleteUser(id) {
    return this.http.post(`https://reqres.in/api/users/${id}`, {
    }, this.httpOptions);
  }
}
