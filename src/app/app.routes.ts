// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components


import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutRoutes } from './layout/layout/auth-layout-routing';
import { AuthGuard } from './guards/auth.guard';
// import { VenueManagementComponent } from './pages/venue-management/venue-management.component';


export const routes: Routes = [
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },

   
  {
    path: 'login',
    loadChildren: ()=> import('./layout/layout/auth-layout-routing').then(m=>m.AuthLayoutRoutes)

  },
  {
    path: 'dashboard',
    loadChildren: ()=> import('./layout/main-layout/main-layout.component').then(m=>m.MainLayoutComponent)
    
    // canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: 'dashboard',
    //     loadComponent: () => 
    //       import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
    //   },
    //   {
    //     path: 'analytics',
    //     loadComponent: () => 
    //       import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent)
    //   },
    //   {
    //     path: 'menu',
    //     loadComponent: () => 
    //       import('./pages/menu/menu.component').then(m => m.MenuComponent)
    //   },
    //   {
    //     path: 'order',
    //     loadComponent: () => 
    //       import('./pages/order/order.component').then(m => m.OrderComponent)
    //   },
    //   {
    //     path: 'customer',
    //     loadComponent: () => 
    //       import('./pages/customer/customer.component').then(m => m.CustomerComponent)
    //   },
    //   {
    //     path: 'transaction',
    //     loadComponent: () =>
    //     import('./pages/transaction/transaction.component').then(m => m.TransactionComponent)
    //   },
    //   {
    //     path: 'admin',
    //     loadComponent: () =>

    //       import('./pages/admin/admin.component').then(m => m.AdminComponent)
    //   }, {
    //     path: 'forgot-password',
    //     loadComponent: () =>
    //       import('./layout/layout/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
    //   }
    //   // {
    //   //   path: 'venue-management',
    //   //   loadComponent: () => 
    //   //     import('./venue-management/venue-management.component').then(m => m.VenueManagementComponent)
    //   // }
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }