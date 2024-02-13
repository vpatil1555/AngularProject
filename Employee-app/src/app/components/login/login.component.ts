import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private msgService: MessageService
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }

  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.loginUser(email as string, password as string).subscribe(
    response => {
    console.log('Login successful. Token:', response.token);
    if (response.token) {
    sessionStorage.setItem('token', response.token);
    this.router.navigate(['/home']);
    } else {
    console.error('Token not received in the response.');
    this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials' });
    }
    },
    error => {
    console.error('Error during login:', error);
    this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
    }
    );
    }
}