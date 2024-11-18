import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from '../../../../services/auth.service';
import { AppState } from '../../../state/app.state';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [HttpClient,authService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
  
  
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  errorMessage: string = '';
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: authService,
    private appState: AppState) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    const loginData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        // Check if the user is authenticated after login
        if (this.appState.getState().isAuthenticated) {
          this.router.navigate(['/dashboard']);

        } else {
          // Handle authentication failure
          this.errorMessage =
            'Authentication failed. Please check your credentials.';
          console.error('Login failed: Authentication failed');
          this.loading = false;

        }
      },
      error: (err) => {
        // Handle other errors
        this.errorMessage =
          err;
        console.error('Login failed', err);
        this.loading = false;

      },
    });
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}