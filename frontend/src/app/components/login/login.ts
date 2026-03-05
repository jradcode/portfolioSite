import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth';

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
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login failed', err);
      }
    });
  }
}
}