import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, take, tap, throwError } from 'rxjs';
import { baseUrl } from '../constants/baseurl.constant';
import { Router } from '@angular/router';
import { AppState } from '../app/state/app.state';
import { DashboardMetrics } from '../app/pages/dashboard/Types/dashboard.types';

export interface Metrics {
  totalMenus: number;
  totalOrders: number;
  totalCustomers: number;
  totalIncome: number;
  todayStats: {
    menus: number;
    orders: number;
    customers: number;
    income: number;
  };
}

export interface RevenueAnalytics {
  labels: string[];
  data: number[];
  growth: number;
}

export interface OrderSummary {
  onDelivery: { amount: number; percentage: number };
  shipped: { amount: number; percentage: number };
  confirmed: { amount: number; percentage: number };
}

export interface RecentOrder {
  name: string;
  customerName: string;
  price: number;
  status: string;
  orderId: string;
}

export interface TrendingMenu {
  name: string;
  rating: number;
  itemId: string;
  orderCount: number;
}

export interface DashboardData {
  metrics: Metrics;
  revenueAnalytics: RevenueAnalytics;
  orderSummary: OrderSummary;
  recentOrders: RecentOrder[];
  trendingMenus: TrendingMenu[];
}

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(
    private http: HttpClient,
    private $state: AppState,
    private route: Router,
    // private transactionsSubject = new BehaviorSubject<any[]>([]),
    // transactions$ = this.transactionsSubject.asObservable(),
    ) {}
  
    // getDashboardData(): Observable<{ success: boolean; data: DashboardData }> {
    //   return this.http.get<{ success: boolean; data: DashboardData }>(`${baseUrl}/dashboard`);
    // }

    getDashboardData(): Observable<{
      success: boolean;
      data: {
        metrics: DashboardMetrics;
        orderSummary: OrderSummary;
        revenueAnalytics: {
          labels: string[];
          data: number[];
        };
      };
    }> {
      return this.http.get<any>(`${baseUrl}/dashboard`);
    }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/customers/delete/${id}`).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  registerCustomer(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/auth/register`, data).pipe(
      map((response: any) => {
        if (!response.success) throw new Error(response.error);
        return response;
      }),
      catchError(error => throwError(() => error.message))
    );
  }

  
  getAllTransactions(): Observable<any> {
    return this.http.get(`${baseUrl}/transactions/all`).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to fetch categories');
      }),
      catchError(error => throwError(() => error.message || 'Failed to fetch categories'))
    );
    
}

// getTotalAmount(): number {
//     return this.transactionsSubject.value.reduce((sum, tx) => sum + tx.amount, 0);
// }

// getTransactionsByStatus(status: string): number {
//     return this.transactionsSubject.value.filter(tx => tx.status === status).length;
// }


  addUser(payload: any): Observable<any> {
    return this.http.post(`${baseUrl}/customers/add`, payload).pipe(
      take(1),
      catchError((err) => of(err)),
      tap((res) => {
        if (!res.success) {
          throw Error(res.message);
        }
      }),
      map((res) => res.data)
    );
  }

  addAdmin(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/admin/register`, data).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to add admin');
      }),
      catchError((error) => {
        return throwError(() => error.message || 'Failed to add admin');
      })
    );
  }

  updateAdmin(id: string, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/admin/update/${id}`, data);
  }

  deleteAdmin(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/admin/delete/${id}`);
  }

  toggleAdminStatus(id: string, isActive: boolean): Observable<any> {
    return this.http.patch(`${baseUrl}/admin/${id}/toggle-status`, { isActive });
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${baseUrl}/categories/get`).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to fetch categories');
      }),
      catchError(error => throwError(() => error.message || 'Failed to fetch categories'))
    );
  }

  addCategory(categoryData: { name: string }): Observable<any> {
    return this.http.post(`${baseUrl}/categories/add`, categoryData).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to add category');
      }),
      catchError(error => throwError(() => error.message || 'Failed to add category'))
    );
  }

  // Menu Item Methods
  getAllItems(): Observable<any> {
    return this.http.get(`${baseUrl}/items/get`).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to fetch items');
      }),
      catchError(error => throwError(() => error.message || 'Failed to fetch items'))
    );
  }

  getItemsByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${baseUrl}/items/category/${categoryId}`).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to fetch items for category');
      }),
      catchError(error => throwError(() => error.message || 'Failed to fetch items for category'))
    );
  }

  addMenuItem(formData: FormData): Observable<any> {
    return this.http.post(`${baseUrl}/items/add`, formData).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to add menu item');
      }),
      catchError(error => throwError(() => error.message || 'Failed to add menu item'))
    );
  }

  deleteMenuItem(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/items/delete/${id}`).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to delete menu item');
      }),
      catchError(error => throwError(() => error.message || 'Failed to delete menu item'))
    );
  }

  toggleItemStock(id: string): Observable<any> {
    return this.http.patch(`${baseUrl}/items/toggle-stock/${id}`, {}).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to update item status');
      }),
      catchError(error => throwError(() => error.message || 'Failed to update item status'))
    );
  }
  

  getUser(): Observable<any> {
    return this.http.get(`${baseUrl}/customers/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) { // Check for 'status' instead of 'success' if that's the correct field
          throw new Error(res.message || 'Failed to retrieve customers');
        }
        return res.data; // Return data if the response is successful
      }),
      catchError((err) => {
        console.error('Error fetching customers:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${baseUrl}/orders/add`, orderData).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) {
          throw new Error(res.message || 'Failed to create order');
        }
        return res.data;
      }),
      catchError((err) => {
        console.error('Error creating order:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }

  searchCustomers(query: string): Observable<any[]> {
    return this.http.get(`${baseUrl}/customers/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.status) {
          throw new Error(res.message);
        }
        // Filter customers based on query
        return res.data.filter((customer: any) => 
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.phone.includes(query)
        );
      }),
      catchError((err) => {
        console.error('Error searching customers:', err);
        return throwError(() => new Error(err.message || 'Server error'));
      })
    );
  }

  getAdmin(): Observable<any> {
    return this.http.get(`${baseUrl}/admin/get`).pipe(
      map((response: any) => {
        if (!response.success) {
          throw new Error(response.error || 'Failed to retrieve admins');
        }
        return response;
      })
    );
  }

  getOrders(): Observable<any> {
    return this.http.get(`${baseUrl}/orders/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.success) { // Changed from status to success
          throw new Error(res.error || 'Failed to retrieve orders');
        }
        return res;
      }),
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => error.message || 'Server error');
      })
    );
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.patch(`${baseUrl}/orders/${orderId}/update-status`, { status }).pipe(
      map((response: any) => {
        if (response.success) {
          return response;
        }
        throw new Error(response.error || 'Failed to update order status');
      }),
      catchError(error => throwError(() => error.message || 'Failed to update order status'))
    );
  }

  getCustomers(): Observable<any> {
    return this.http.get(`${baseUrl}/customer/get`).pipe(
      take(1),
      map((res: any) => {
        if (!res.success) { // Changed from status to success
          throw new Error(res.error || 'Failed to retrieve orders');
        }
        return res;
      }),
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return throwError(() => error.message || 'Server error');
      })
    );
  }

  getCustomerDetails(id: string): Observable<any> {
    return this.http.get(`${baseUrl}/customer/get/${id}`).pipe(
      map((response: any) => {
        if (response.success) return response;
        throw new Error(response.error);
      }),
      catchError(error => throwError(() => error.message))
    );
  }

  deleteCustomer(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/customer/delete/${id}`).pipe(
      map((response: any) => {
        if (response.success) return response;
        throw new Error(response.error);
      }),
      catchError(error => throwError(() => error.message))
    );
  }

  // getNewOrders(): Observable<Order[]> {
  //   return this.http.get<any>(`${baseUrl}/orders/get`).pipe(
  //     map(response => response.data), // Extract the data array from the response
  //     catchError(error => {
  //       console.error('Error fetching orders:', error);
  //       return throwError(() => error);
  //     })
  //   );
  // }

  getPayments(): Observable<any> {
    return this.http.get(`${baseUrl}/orders/get`).pipe(
      take(1),
      map((response: any) => {
        if (!response.status) {
          throw new Error('Failed to retrieve orders');
        }
        return response.data; // Return just the data array
      }),
      catchError(error => {
        console.error('Error fetching orders:', error);
        return throwError(() => error);
      })
    );
  }

  getDashboardStats(dateRange: string = 'week'): Observable<any> {
    return this.http.get(`${baseUrl}/dashboard/stats?dateRange=${dateRange}`)
      .pipe(
        map((response: any) => {
          if (!response.status) {
            throw new Error(response.message);
          }
          return response.data;
        })
      );
  }

  // updateOrderStatus(orderId: string, status: string): Observable<any> {
  //   return this.http.patch(`${baseUrl}/orders/status/${orderId}`, { 
  //     status: status 
  //   }).pipe(
  //     map((response: any) => {
  //       if (!response.status) {
  //         throw new Error(response.message || 'Failed to update order status');
  //       }
  //       return response.data;
  //     })
  //   );
  // }

  getInProcessOrdersCount(): Observable<number> {
    return this.http.get<any>(`${baseUrl}/orders/get`).pipe(
      map(response => {
        if (response.status && response.data) {
          return response.data.filter(
            (order: any) => order.status === 'IN-PROCESS'
          ).length;
        }
        return 0;
      }),
      catchError(error => {
        console.error('Error getting in-process orders count:', error);
        return of(0);
      })
    );
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/orders/get/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error getting order:', error);
        return throwError(() => error);
      })
    );
  }

  updateOrder(id: string, orderData: any): Observable<any> {
    return this.http.put<any>(`${baseUrl}/orders/update/${id}`, orderData).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error updating order:', error);
        return throwError(() => error);
      })
    );
  }

  getOrderWithPayment(id: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/orders/get/${id}`).pipe(
      catchError(error => {
        console.error('Error getting order:', error);
        return throwError(() => error);
      })
    );
  }
  
}
  

  

