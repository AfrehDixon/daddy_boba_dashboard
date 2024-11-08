// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components


import { MainLayoutComponent } from './auth/main-layout/main-layout.component';
import { LayoutComponent } from './auth/layout/layout.component';
import { AuthGuard } from './guards/auth.guards';
// import { VenueManagementComponent } from './pages/venue-management/venue-management.component';


export const routes: Routes = [

    {
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => 
          import('./auth/pages/login/login.component').then(m => m.LoginComponent)
      }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => 
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => 
          import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'menu',
        loadComponent: () => 
          import('./pages/menu/menu.component').then(m => m.MenuComponent)
      },
      {
        path: 'order',
        loadComponent: () => 
          import('./pages/order/order.component').then(m => m.OrderComponent)
      },
      {
        path: 'customer',
        loadComponent: () => 
          import('./pages/customer/customer.component').then(m => m.CustomerComponent)
      },
      {
        path: 'transaction',
        loadComponent: () =>
        import('./pages/transaction/transaction.component').then(m => m.TransactionComponent)
      },
      {
        path: 'admin',
        loadComponent: () =>

          import('./pages/admin/admin.component').then(m => m.AdminComponent)
      }
      // {
      //   path: 'venue-management',
      //   loadComponent: () => 
      //     import('./venue-management/venue-management.component').then(m => m.VenueManagementComponent)
      // }
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