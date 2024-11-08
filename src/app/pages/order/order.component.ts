import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import {MatSelectModule} from '@angular/material/select';

import { FormsModule } from '@angular/forms';

interface Order {
  orderId: string;
  date: string;
  time: string;
  customerName: string;
  location: string;
  amount: number;
  status:
    | 'PENDING'
    | 'DELIVERED'
    | 'CANCELED'
    | 'Completed'
    | 'Processing'
    | 'Pending'
    | 'Cancelled';
  items: { name: string; quantity: number; price: number; total: number }[];
  customerDetails: {
    email: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    FormsModule,
    NzSwitchModule,
    NzSelectModule,
    MatSelectModule
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  selectedOrder: {
amount: any;
items: any;
customerDetails: any;
customerName: any;
paymentMethod: any;
date: any;
time: any;
orderId: any; status: string 
} | null = null;

  item: any;
  isSubscribedToEmailsMessage: any;
  statuses: Order['status'][] = [
    'PENDING',
    'DELIVERED',
    'CANCELED',
    'Completed',
    'Processing',
    'Pending',
    'Cancelled',
  ];
  orderService: any;
  modal: any;
  message: any;
  // modal: any;
  // message: any;

   orders: Order[] = [
    {
      orderId: 'ORD-001',
      date: '2024-03-07',
      time: '14:30',
      customerName: 'John Doe',
      location: 'Accra Mall, Accra',
      amount: 45.99,
      status: 'Completed',
      items: [
        {
          name: 'Classic Pearl Milk Tea',
          quantity: 2,
          price: 15.99,
          total: 31.98,
        },
        { name: 'Bubble Tea Topping', quantity: 2, price: 7.0, total: 14.0 },
      ],
      customerDetails: {
        email: 'john.doe@email.com',
        phone: '+233 20 123 4567',
        address: '123 Main St, Accra',
      },
      paymentMethod: 'Credit Card',
    },
    {
      orderId: 'ORD-002',
      date: '2024-03-07',
      time: '15:45',
      customerName: 'Sarah Johnson',
      location: 'West Hills Mall, Accra',
      amount: 67.5,
      status: 'Processing',
      items: [
        { name: 'Brown Sugar Milk Tea', quantity: 3, price: 18.5, total: 55.5 },
        { name: 'Extra Pearls', quantity: 3, price: 4.0, total: 12.0 },
      ],
      customerDetails: {
        email: 'sarah.j@email.com',
        phone: '+233 24 456 7890',
        address: '45 West Road, West Hills',
      },
      paymentMethod: 'Mobile Money',
    },
    {
      orderId: 'ORD-003',
      date: '2024-03-07',
      time: '16:15',
      customerName: 'Michael Brown',
      location: 'East Legon, Accra',
      amount: 89.97,
      status: 'Pending',
      items: [
        { name: 'Cheese Foam Tea', quantity: 3, price: 22.99, total: 68.97 },
        { name: 'Pudding Topping', quantity: 3, price: 7.0, total: 21.0 },
      ],
      customerDetails: {
        email: 'michael.b@email.com',
        phone: '+233 27 789 0123',
        address: '78 East Legon Street',
      },
      paymentMethod: 'Cash on Delivery',
    },
    {
      orderId: 'ORD-004',
      date: '2024-03-07',
      time: '16:45',
      customerName: 'Emma Wilson',
      location: 'Osu, Accra',
      amount: 34.99,
      status: 'Completed',
      items: [
        { name: 'Taro Milk Tea', quantity: 2, price: 17.49, total: 34.99 },
      ],
      customerDetails: {
        email: 'emma.w@email.com',
        phone: '+233 23 890 1234',
        address: '12 Oxford Street, Osu',
      },
      paymentMethod: 'Credit Card',
    },
    {
      orderId: 'ORD-005',
      date: '2024-03-07',
      time: '17:00',
      customerName: 'David Chen',
      location: 'Airport Residential, Accra',
      amount: 156.94,
      status: 'Processing',
      items: [
        { name: 'Fruit Tea Set', quantity: 5, price: 25.99, total: 129.95 },
        { name: 'Jelly Topping', quantity: 5, price: 5.39, total: 26.95 },
      ],
      customerDetails: {
        email: 'david.c@email.com',
        phone: '+233 26 901 2345',
        address: '34 Airport Res. Area',
      },
      paymentMethod: 'Bank Transfer',
    },
    {
      orderId: 'ORD-006',
      date: '2024-03-07',
      time: '17:30',
      customerName: 'Linda Thompson',
      location: 'Cantonments, Accra',
      amount: 55.98,
      status: 'Pending',
      items: [
        { name: 'Matcha Latte', quantity: 2, price: 21.99, total: 43.98 },
        { name: 'Aloe Jelly', quantity: 3, price: 4.0, total: 12.0 },
      ],
      customerDetails: {
        email: 'linda.t@email.com',
        phone: '+233 25 012 3456',
        address: '56 Cantonments Road',
      },
      paymentMethod: 'Mobile Money',
    },
    {
      orderId: 'ORD-007',
      date: '2024-03-07',
      time: '18:00',
      customerName: 'James Anderson',
      location: 'Labone, Accra',
      amount: 78.96,
      status: 'Completed',
      items: [
        { name: 'Premium Tea Set', quantity: 4, price: 19.74, total: 78.96 },
      ],
      customerDetails: {
        email: 'james.a@email.com',
        phone: '+233 24 123 4567',
        address: '89 Labone Street',
      },
      paymentMethod: 'Credit Card',
    },
    {
      orderId: 'ORD-008',
      date: '2024-03-07',
      time: '18:30',
      customerName: 'Sophie Martinez',
      location: 'Roman Ridge, Accra',
      amount: 123.45,
      status: 'Processing',
      items: [
        { name: 'Party Package A', quantity: 1, price: 123.45, total: 123.45 },
      ],
      customerDetails: {
        email: 'sophie.m@email.com',
        phone: '+233 23 234 5678',
        address: '23 Roman Ridge Road',
      },
      paymentMethod: 'Bank Transfer',
    },
    {
      orderId: 'ORD-009',
      date: '2024-03-07',
      time: '19:00',
      customerName: 'Robert Kim',
      location: 'Dzorwulu, Accra',
      amount: 44.97,
      status: 'Cancelled',
      items: [
        { name: 'Classic Milk Tea', quantity: 3, price: 12.99, total: 38.97 },
        { name: 'Pearl Topping', quantity: 3, price: 2.0, total: 6.0 },
      ],
      customerDetails: {
        email: 'robert.k@email.com',
        phone: '+233 26 345 6789',
        address: '67 Dzorwulu Street',
      },
      paymentMethod: 'Credit Card',
    },
    {
      orderId: 'ORD-010',
      date: '2024-03-07',
      time: '19:30',
      customerName: 'Grace Addo',
      location: 'Spintex, Accra',
      amount: 167.92,
      status: 'Completed',
      items: [
        { name: 'Family Package', quantity: 1, price: 149.99, total: 149.99 },
        { name: 'Extra Toppings Set', quantity: 1, price: 17.93, total: 17.93 },
      ],
      customerDetails: {
        email: 'grace.a@email.com',
        phone: '+233 25 456 7890',
        address: '45 Spintex Road',
      },
      paymentMethod: 'Mobile Money',
    },
   ];
  openStatusId: string | null | undefined;
  


  showOrderDetails(order: Order) {
    this.selectedOrder = order;
  }

  closeOrderDetails() {
    this.selectedOrder = null;
  }

  onStatusChange(order: Order) {
    // Handle the status change logic here, if needed (e.g., save to backend)
    console.log(`Order ${order.orderId} status changed to: ${order.status}`);
  }
toggleOrderStatus(order: any, status: string) {
  // Update the order status
  order.status = status;

  // Call a service to save the updated order status (if necessary)
  this.orderService.updateOrderStatus(order.orderId, status).subscribe(
    (    response: any) => {
      // Handle success response
      console.log('Order status updated successfully:', response);
    },
    (    error: any) => {
      // Handle error response
      console.error('Error updating order status:', error);
    }
  );
}
  
   toggleStatusDropdown(orderId: string) {
    this.openStatusId = this.openStatusId === orderId ? null : orderId;
  }

  updateOrderStatus(orderId: string, newStatus: string) {
    // Implement your status update logic here
    this.openStatusId = null; // Close dropdown after selection
  }
  
   // Initialize with all orders
  
  //  filterOrders(status: string) {
  //   if (status) {
  //     this.filteredOrders = this.orders.filter(order => order.status === status);
  //   } else {
  //     this.filteredOrders = [...this.orders];  // Show all if no status selected
  //   }
  // }

   filterControls = {
    status: '',
    dateRange: {
      start: '',
      end: ''
    },
    searchTerm: '',
    paymentMethod: '',
    minAmount: null as number | null,
    maxAmount: null as number | null
  };

  get filteredOrders() {
    return this.orders.filter(order => {
      // Status filter
      if (this.filterControls.status &&
        order.status !== this.filterControls.status) {
        return false;
      }

      // Date range filter
      if (this.filterControls.dateRange.start) {
        const startDate = new Date(this.filterControls.dateRange.start);
        const orderDate = new Date(order.date);
        if (orderDate < startDate) return false;
      }
      if (this.filterControls.dateRange.end) {
        const endDate = new Date(this.filterControls.dateRange.end);
        const orderDate = new Date(order.date);
        if (orderDate > endDate) return false;
      }

      // If all filters pass, return true
      return true;
    });
  }

  // filteredOrders = [...this.orders];
  
  openStatusModal(order: any) {
    // Open a modal with a dropdown to change status
    this.modal.create({
      nzTitle: `Change Status for Order ${order.orderId}`,
      nzContent: `
        <nz-select [(ngModel)]="order.status">
          <nz-option *ngFor="let status of statuses" [nzValue]="status" [nzLabel]="status"></nz-option>
        </nz-select>
      `,
      // nzFooter: [
      //   {
      //     label: 'Cancel',
      //     type: 'default',
      //     onClick: () => this.modal.closeAll(),
      //   },
      //   {
      //     label: 'Save',
      //     type: 'primary',
      //     onClick: () => {
      //       this.message.success(`Order ${order.orderId} status updated to ${order.status}`);
      //       this.modal.closeAll();
      //     },
      //   },
      // ],
    });
    // this.selectedOrder = { ...order }; // Create a copy of the order to prevent mutations
  }


  //  constructor(private modal: NzModalService, private message: NzMessageService) {}
  // openStatusModal(order: Order) {
  //   // Open a modal with a dropdown to change status
  //   this.modal.create({
  //     nzTitle: `Change Status for Order ${order.orderId}`,
  //     nzContent: `
  //       <nz-select [(ngModel)]="order.status">
  //         <nz-option *ngFor="let status of statuses" [nzValue]="status" [nzLabel]="status"></nz-option>
  //       </nz-select>
  //     `,
  //     nzFooter: [
  //       {
  //         label: 'Cancel',
  //         type: 'default',
  //         onClick: () => this.modal.closeAll(),
  //       },
  //       {
  //         label: 'Save',
  //         type: 'primary',
  //         onClick: () => {
  //           this.message.success(`Order ${order.orderId} status updated to ${order.status}`);
  //           this.modal.closeAll();
  //         },
  //       },
  //     ],
  //   });
  // }

 

 
  
  

}


