import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/auth';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:4000';
 
constructor(private http: HttpClient) { }
 
registerUser(userDetails: User): Observable<any> {
return this.http.post(`${this.baseUrl}/register`, userDetails);
}
 
loginUser(email: string, password: string): Observable<any> {
const loginCredentials = { email, password };
return this.http.post(`${this.baseUrl}/login`, loginCredentials,{
  headers: new HttpHeaders(
    {
      'custom-header': 'Employee-App'
    }
  )
}
);
}

isAuthenticated(): boolean{
  if(sessionStorage.getItem('token')!==null) {
    return true;
  }
  return false;
}

}

