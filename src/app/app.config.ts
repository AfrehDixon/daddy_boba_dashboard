import { withInterceptorsFromDi, provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppState } from './state/app.state';
import { authService } from '../services/auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AppState,
    authService, provideAnimationsAsync()
  ]
};