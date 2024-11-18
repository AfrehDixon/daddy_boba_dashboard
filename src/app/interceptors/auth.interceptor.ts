import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
import { authService } from '../../services/auth.service';
import { AppState } from '../state/app.state';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private authService: authService, private appState: AppState) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/admin/login')) {
      return next.handle(req);
    }

    const token = this.appState.getState().token;
    // console.log('Token in interceptor:', token);

    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      // console.log('Request headers:', clonedReq.headers.get('Authorization'));
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.login({ refreshToken: this.appState.getState().refreshToken }).pipe(
        switchMap((response: any) => {
          if (response.status) {
            const { accessToken, refreshToken } = response.data;

            this.appState.setState({
              token: accessToken,
              refreshToken: refreshToken,
            });

            this.refreshTokenSubject.next(accessToken);
            return next.handle(this.addToken(req, accessToken));
          } else {
            this.authService.logout();
            return throwError(() => new Error('Unauthorized'));
          }
        }),
        catchError((err) => {
          this.authService.logout();
          return throwError(() => err);
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addToken(req, token!)))
      );
    }
  }

  
}
