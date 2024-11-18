import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { AppService } from '../../../services/app.service';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  dob: Date;
  createdAt: Date;
  addresses: Array<{
    streetAddress: string;
    city: string;
    landmark: string;
    region: string;
    label: string;
    isDefault: boolean;
  }>;
}

interface CustomerAddress {
  _id: string;
  customer: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    createdAt: string;
    updatedAt: string;
  };
  label: string;
  streetAddress: string;
  city: string;
  region: string;
  landmark?: string;  // Make landmark optional
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

interface RegisterCustomerDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  gender: 'MALE' | 'FEMALE';
  dob: string;
}

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule, ReactiveFormsModule],
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: CustomerAddress[] = [];
  loading = false;
  searchTerm = '';
  selectedCustomer: CustomerAddress | null = null;
  showAddModal = false;

  constructor(
    private customerService: AppService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });
  }

  customerForm: any;

  registerCustomer() {
    if (this.customerForm.invalid) return;

    this.loading = true;
    this.customerService.registerCustomer(this.customerForm.value as RegisterCustomerDto)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.showSnackBar('Customer registered successfully');
          this.loadCustomers();
          this.closeAddModal();
        },
        error: (error) => this.showSnackBar(error, true)
      });
  }

  closeAddModal() {
    this.showAddModal = false;
    this.customerForm.reset();
  }
  
  // get filteredCustomers() {
  //   return this.customers.filter(address => 
  //     address.customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //     address.customer.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
  //     address.customer.phone.includes(this.searchTerm)
  //   );
  // }
  
  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.loading = true;
    this.customerService.getCustomers()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.customers = response.data;
        },
        error: (error) => {
          this.showSnackBar(error, true);
        }
      });
  }

  showCustomerDetails(customer: CustomerAddress) {
    this.selectedCustomer = customer;
  }

  deleteCustomer(id: string) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.loading = true;
      this.customerService.deleteCustomer(id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.showSnackBar('Customer deleted successfully');
            this.loadCustomers();
          },
          error: (error) => {
            this.showSnackBar(error, true);
          }
        });
    }
  }

  showSnackBar(message: string, isError = false) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  get filteredCustomers() {
    return this.customers.filter(address => 
      address.customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      address.customer.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      address.customer.phone.includes(this.searchTerm)
    );
  }

  getDefaultAddress(customerAddress: CustomerAddress) {
    return {
      streetAddress: customerAddress.streetAddress,
      city: customerAddress.city,
      region: customerAddress.region,
      label: customerAddress.label
    };
  }

  formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString();
  }
}