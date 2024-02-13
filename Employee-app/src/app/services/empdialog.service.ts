import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emp } from '../interface/auth';

@Injectable({
  providedIn: 'root'
})
export class EmpdialogService {

  constructor(private http: HttpClient) { }

  addemployee(empdetails:any, headers: HttpHeaders): Observable<any>{
    return this.http.post("/Emp", empdetails, {headers});
  }
  getemployee(token: string): Observable<any>{
    const headers = new HttpHeaders().set(`Authorization`, `Bearer ${token}`)
    return this.http.get("/Emp", {headers});
  }

  
}
