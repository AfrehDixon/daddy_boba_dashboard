import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { AppService } from '../../../services/app.service';
import { finalize } from 'rxjs';

interface Item {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}
interface OrderItem {
  item: Item;
  quantity: number;
  price: number;
  subtotal: number;
  _id: string;
}

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'PROCESSING' | 'DELIVERED' | 'CANCELED';
  createdAt: string;
  updatedAt: string;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  CONFIRMED = 'CONFIRMED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  loading = false;
  orders: Order[] = [];
  selectedOrder: Order | null = null;
  openStatusId: string | null = null;
  filterControls = {
    status: '',
    dateRange: {
      start: '',
      end: ''
    },
    searchTerm: ''
  };

  OrderStatus = OrderStatus; // Make enum available in template
  statusOptions = Object.values(OrderStatus);
  showStatusDropdown: { [key: string]: boolean } = {};

  statuses = ['PENDING', 'PROCESSING', 'DELIVERED', 'CANCELED', 'DELIVERING', 'CONFIRMED'];

  constructor(private orderService: AppService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.orderService.getOrders()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.orders = response.data;
        },
        error: (error) => {
          console.error('Error loading orders:', error);
        }
      });
  }

  showOrderDetails(order: Order) {
    this.selectedOrder = order;
  }

  closeOrderDetails() {
    this.selectedOrder = null;
  }

  // toggleStatusDropdown(orderId: string) {
  //   this.openStatusId = this.openStatusId === orderId ? null : orderId;
  // }

  // updateOrderStatus(orderId: string, newStatus: string) {
  //   // Implement status update logic here
  //   this.openStatusId = null;
  // }

  get filteredOrders() {
    return this.orders.filter(order => {
      const matchesStatus = !this.filterControls.status || 
                          order.status === this.filterControls.status;

      const matchesSearch = !this.filterControls.searchTerm || 
                          order.orderNumber.toLowerCase().includes(this.filterControls.searchTerm.toLowerCase()) ||
                          order.customer.name.toLowerCase().includes(this.filterControls.searchTerm.toLowerCase());

      const matchesDateRange = this.isWithinDateRange(order.createdAt);

      return matchesStatus && matchesSearch && matchesDateRange;
    });
  }

  toggleStatusDropdown(orderId: string) {
    this.showStatusDropdown[orderId] = !this.showStatusDropdown[orderId];
  }

  closeAllStatusDropdowns() {
    this.showStatusDropdown = {};
  }

  updateOrderStatus(orderId: string, newStatus: OrderStatus) {
    this.loading = true;
    
    this.orderService.updateOrderStatus(orderId, newStatus)
      .pipe(finalize(() => {
        this.loading = false;
        this.closeAllStatusDropdowns();
      }))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.showSnackBar(`Order status updated to ${newStatus}`);
            this.loadOrders(); // Refresh orders list
          }
        },
        error: (error) => {
          console.error('Error updating order status:', error);
          this.showSnackBar('Failed to update order status', true);
        }
      });
  }

  private showSnackBar(message: string, isError: boolean = false) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isError ? 'snack-bar-error' : 'snack-bar-success'
    });
  }

  getStatusBadgeClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case OrderStatus.PENDING:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case OrderStatus.PROCESSING:
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case OrderStatus.CONFIRMED:
        return `${baseClasses} bg-green-100 text-green-800`;
      case OrderStatus.DELIVERING:
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case OrderStatus.DELIVERED:
        return `${baseClasses} bg-green-200 text-green-900`;
      case OrderStatus.CANCELLED:
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.PROCESSING:
        return 'bg-blue-100 text-blue-800';
      case OrderStatus.CONFIRMED:
        return 'bg-green-100 text-green-800';
      case OrderStatus.DELIVERING:
        return 'bg-purple-100 text-purple-800';
      case OrderStatus.DELIVERED:
        return 'bg-green-200 text-green-900';
      case OrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusDotClass(status: string): string {
    switch (status) {
      case OrderStatus.PENDING:
        return 'bg-yellow-500';
      case OrderStatus.PROCESSING:
        return 'bg-blue-500';
      case OrderStatus.CONFIRMED:
        return 'bg-green-500';
      case OrderStatus.DELIVERING:
        return 'bg-purple-500';
      case OrderStatus.DELIVERED:
        return 'bg-green-600';
      case OrderStatus.CANCELLED:
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  }

  private isWithinDateRange(dateStr: string): boolean {
    if (!this.filterControls.dateRange.start && !this.filterControls.dateRange.end) {
      return true;
    }

    const orderDate = new Date(dateStr);
    const startDate = this.filterControls.dateRange.start ? 
                     new Date(this.filterControls.dateRange.start) : null;
    const endDate = this.filterControls.dateRange.end ? 
                   new Date(this.filterControls.dateRange.end) : null;

    if (startDate && orderDate < startDate) return false;
    if (endDate && orderDate > endDate) return false;

    return true;
  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  }

  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}