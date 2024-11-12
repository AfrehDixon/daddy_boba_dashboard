import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.isAuthenticated$().pipe(
      map(isAuth => {
        if (!isAuth) {
          this.router.navigate(['/auth/login']);
          return false;
        }
        return true;
      })
    );
  }
}