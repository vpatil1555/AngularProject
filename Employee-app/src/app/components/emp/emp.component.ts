import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emp } from '../../interface/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { EmpdialogService } from '../../services/empdialog.service';
import { Token } from '@angular/compiler';
import { jwtDecode } from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrl: './emp.component.css'
})
export class EmpComponent implements OnInit {

  empform = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    salary: ['', Validators.required],
    jdate: ['', Validators.required],

  });

  //declaring a property which has the type interface.
  employees: Emp[] = [];
  fadeOutState = 'visible';
  tokenContent: any;

  //injecting the router and homeService
  constructor(private router: Router, private list: EmpdialogService, private fb: FormBuilder) { }

  //logout() method for clearing sessionstorage then routing to login page.
  logOut() {
    this.fadeOutState = 'hidden';

    //Timeout function for animation and also logout feature
    setTimeout(() => {
      sessionStorage.clear();
      this.router.navigate(['login']);
    }, 800);
  }

  //getting the employeelist from homeservice and assiging it to employes.
  addemp() {
    const postData = { ...this.empform.value };
    const token = sessionStorage.getItem('token');
    if(token){
      const headers = new HttpHeaders().set(
        `Authorization`, `Bearer ${token}`
      );
      try {
        this.tokenContent = jwtDecode(token);
        console.log(this.tokenContent);
        if (this.tokenContent.email) {
          console.log(postData);
          this.list.addemployee(postData as Emp, headers).subscribe(res => {
            this.getemps(token);
          });
        } else {
          console.error('token invalid for email');
        }
      } catch (error) {
        console.error(' UnAuthorized or session time out');
      }
    
    } else {
      console.error('token not found');
    }
    }
    

  getemps(token: string) {
    try {
      this.tokenContent = jwtDecode(token);
      console.log(this.tokenContent);
      if (this.tokenContent.email) {
        this.list.getemployee(token).subscribe(res => {
          this.employees = res;
        });
      } else {
        console.error('token invalid for email');
      }
    } catch (error) {
      console.error(' UnAuthorized');
    }
    
    
  }


  //getting the employeelist from homeservice and assiging it to employes.
  ngOnInit() {
    const token = sessionStorage.getItem('token')

    if (token) {
      try {
        this.tokenContent = jwtDecode(token);
        console.log(this.tokenContent);
        if (this.tokenContent.email) {
          this.getemps(token);
        } else {
          console.error('token invalid for email');
        }
      } catch (error) {
        console.error('(401) UnAuthorized');
      }
    } else {
      console.error('token not found');
    }
  }
}


