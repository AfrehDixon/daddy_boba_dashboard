import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
  
  
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  authService: any;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

   onSubmit() {
    if (this.loginForm.valid) {
      const success = this.authService.login(this.loginForm.value);
      if (!success) {
        // Handle login error
        console.error('Login failed');
      }
    }
  }
}