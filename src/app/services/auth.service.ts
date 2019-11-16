import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

interface mydata {
  success: boolean,
  message: string
}

interface registerResponse {
  success: boolean,
  Message: string
}

const httpOptions = {
  headers: new HttpHeaders({
    'enctype': 'multipart/formdata',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false

  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus
  }

  getUserDetails(email, password) {
    // post user details to API server and return user info if correct
    return this.http.post<mydata>('/api/login', {
      email, password
    });
  }

  registerUser(email, password) {
    return this.http.post<registerResponse>('/api/register', {
      email, password
    });
  }

}
