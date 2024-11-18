// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/pages/login/login.component';

export const routes: Routes = [
  // Auth routes without MainLayout
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  // Protected routes with MainLayout
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component')
          .then(m => m.DashboardComponent),canActivate: [AuthGuard]
      },
      {
        path: 'analytics',
        loadComponent: () => import('./pages/analytics/analytics.component')
          .then(m => m.AnalyticsComponent),canActivate: [AuthGuard]
      },
      {
        path: 'menu',
        loadComponent: () => import('./pages/menu/menu.component')
          .then(m => m.MenuComponent),canActivate: [AuthGuard]
      },
      {
        path: 'order',
        loadComponent: () => import('./pages/order/order.component')
          .then(m => m.OrderComponent),canActivate: [AuthGuard]
      },
      {
        path: 'customer',
        loadComponent: () => import('./pages/customer/customer.component')
          .then(m => m.CustomerComponent),canActivate: [AuthGuard]
      },
      {
        path: 'transaction',
        loadComponent: () => import('./pages/transaction/transaction.component')
          .then(m => m.TransactionComponent),canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        loadComponent: () => import('./pages/admin/admin.component')
          .then(m => m.AdminComponent),canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }