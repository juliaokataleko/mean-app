import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

interface myData {
  status: boolean,
  email: string
  quote: string
}

const httpOptions = {
  headers: new HttpHeaders({
    'enctype': 'multipart/formdata',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  })
}

interface isLoggedIn{
  status: boolean
}

interface logoutStatus{
  success: boolean
}

interface quoteStatus{
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private store: Store<any>
    ) { }

  getData() {
    return this.http.get<myData>('/api/data', httpOptions)
  }

  isLoggedIn():Observable <isLoggedIn> {
    return this.http.get<isLoggedIn>('/api/isloggedin');
  }

  logout() {
    return this.http.get<logoutStatus>('/api/logout');
  }

  updateQuote(value) {
    return this.http.post<quoteStatus>('/api/quote', {
      value
    })
  }

  getAllState() {
    return this.store.select('appReducer')
  }

}
