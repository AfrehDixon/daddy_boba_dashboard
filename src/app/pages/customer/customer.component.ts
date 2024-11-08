import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../../types';
// import { Customer } from './customer.model'; // Adjust the path as necessary


// interface Customer {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   address: string;
//   membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
//   joinDate: Date;
//   lastVisit: Date;
//   totalOrders: number;
//   totalSpent: number;
// }

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule , FormsModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
   customers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+233 20 123 4567',
      address: '123 Main St, Accra',
      membershipLevel: 'Gold',
      joinDate: new Date('2023-01-15'),
      lastVisit: new Date('2024-03-20'),
      totalOrders: 25,
      totalSpent: 1250.50
    },
    // Add more sample customers as needed
  ];

  // UI State
  showingCustomerForm = false;
  editingCustomer: Customer | null = null;
  selectedCustomer: Customer | null = null;
  searchTerm = '';
  membershipFilter = '';

  // Form Model
  customerForm = {
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipLevel: 'Bronze' as const
  };

  ngOnInit() {
    // Initialize component
  }

  get filteredCustomers() {
    return this.customers.filter(customer => {
      const matchesSearch = customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          customer.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesMembership = !this.membershipFilter || customer.membershipLevel === this.membershipFilter;
      return matchesSearch && matchesMembership;
    });
  }

  // editCustomer(customer: Customer) {
  //   this.showCustomerForm(customer);
  // }

  deleteCustomer(id: string) {
    if (confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      this.customers = this.customers.filter(c => c.id !== id);
    }
  }

  showCustomerDetails(customer: Customer) {
    this.selectedCustomer = customer;
  }
  getMembershipBadgeClass(level: string) {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-semibold';
    switch (level) {
      case 'Bronze': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Silver': return `${baseClasses} bg-gray-100 text-gray-800`;
      case 'Gold': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Platinum': return `${baseClasses} bg-purple-100 text-purple-800`;
      default: return baseClasses;
    }
  }

  showCustomerForm(customer?: Customer) {
    this.showingCustomerForm = true;
    if (customer) {
      this.editingCustomer = customer;
      // this.customerForm = {
      //   name: customer.name,
      //   email: customer.email,
      //   phone: customer.phone,
      //   address: customer.address,
      //   // membershipLevel: customer.membershipLevel
      // };
    }
  }

  closeCustomerForm() {
    this.showingCustomerForm = false;
    this.editingCustomer = null;
    this.customerForm = {
      name: '',
      email: '',
      phone: '',
      address: '',
      membershipLevel: 'Bronze'
    };
  }

  saveCustomer() {
    if (this.editingCustomer) {
      // Update existing customer
      const index = this.customers.findIndex(c => c.id === this.editingCustomer!.id);
      this.customers[index] = {
        ...this.customers[index],
        ...this.customerForm
      };
    } else {
      // Add new customer
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...this.customerForm,
        joinDate: new Date(),
        lastVisit: new Date(),
        totalOrders: 0,
        totalSpent: 0
      };
      this.customers.push(newCustomer);
    }
    this.closeCustomerForm();
  }

  // editCustomer(customer:

}
