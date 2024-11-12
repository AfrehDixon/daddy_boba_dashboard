import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  
  constructor(private router: Router) {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.next(true);
    }
  }

  login(credentials: {username: string, password: string}) {
    // Add your actual login logic here
    // This is just a mock implementation
    if (credentials.username && credentials.password) {
      console.log(credentials.username, credentials.password);
      localStorage.setItem('token', 'token');
      this.isAuthenticated.next(true);
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated$() {
    return this.isAuthenticated.asObservable();
  }
}