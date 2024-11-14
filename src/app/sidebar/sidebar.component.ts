// src/app/components/sidebar/sidebar.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./sidebar.component.css'],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  menuItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      path: '/dashboard'
    },
    // {
    //   label: 'Analytics',
    //   icon: 'analytics',
    //   path: '/analytics'
    // },
    {
      label: 'Menu',
      icon: 'restaurant_menu',
      path: '/menu'
    },
    {
      label: 'Order',
      icon: 'shopping_cart',
      path: '/order'
    },
    {
      label: 'Customer',
      icon: 'people',
      path: '/customer'
    },
    // {
    //   label: 'Review',
    //   icon: 'star',
    //   path: '/review'
    // },
    // {
    //   label: 'Message',
    //   icon: 'message',
    //   path: '/message'
    // },
    // {
    //   label: 'Venue Management',
    //   icon: 'store',
    //   path: '/venue-management'
    // },
    {
      label: 'Transaction',
      icon: 'monetization_on',
      path: '/transaction'
    },
    {
      label: 'Admin',
      icon: 'account_circle',
      path: '/admin'
    }
  ];

  logout() {
    console.log('Logging out...');
  }
}