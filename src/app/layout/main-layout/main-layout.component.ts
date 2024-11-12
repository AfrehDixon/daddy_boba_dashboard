import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  routes: Routes = [
    { path: 'dashboard', redirectTo: '', pathMatch: 'full' },

    {
      path: 'dashboard',
      async loadComponent() {
        const m = await import('../../pages/dashboard/dashboard.component');
        return m.DashboardComponent;
      },
    },
    {
      path: 'analytics',
      async loadComponent() {
        const m = await import('../../pages/analytics/analytics.component');
        return m.AnalyticsComponent;
      },
    },
    {
      path: 'menu',
      async loadComponent() {
        const m = await import('../../pages/menu/menu.component');
        return m.MenuComponent;
      },
    },
    {
      path: 'order',
      async loadComponent() {
        const m = await import('../../pages/order/order.component');
        return m.OrderComponent;
      },
    },
    {
      path: 'customer',
      async loadComponent() {
        const m = await import('../../pages/customer/customer.component');
        return m.CustomerComponent;
      },
    },
    {
      path: 'transaction',
      async loadComponent() {
        const m = await import('../../pages/transaction/transaction.component');
        return m.TransactionComponent;
      },
    },
    {
      path: 'admin',
      async loadComponent() {
        const m = await import('../../pages/admin/admin.component');
        return m.AdminComponent;
      },
    },
  ];
}
