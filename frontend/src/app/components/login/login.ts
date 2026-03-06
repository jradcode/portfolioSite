import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  errorMessage = '';

  //Handles form submit
  onSubmit() {
  if (this.loginForm.valid) {
    const { username, password } = this.loginForm.value;
    //Makes sure the backend variables match frontend
    this.authService.login({ 
      Username: username!, 
      Password: password! 
    }).subscribe({
      next: () => {
        this.toastr.success('Welcome Admin', 'LOGIN SUCCESS!') 
        this.errorMessage = '';
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'INVALID username or password';
        console.error('LOGIN FAILED', err);
      }
    });
  }
}
}