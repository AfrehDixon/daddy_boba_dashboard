import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
  profileImage?: string;
} 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  admins: Admin[] = [];
  filteredAdmins: Admin[] = [];
  showAddModal = false;
  searchQuery = '';
  selectedRole = '';
  selectedStatus = '';

  roles = ['Super Admin', 'Admin', 'Manager', 'Support'];
  permissions = [
    'User Management',
    'Content Management',
    'Order Management',
    'Transaction Management',
    'Report Access',
    'Settings Management'
  ];

  newAdmin = {
    name: '',
    email: '',
    role: '',
    permissions: [] as string[],
    password: '',
    confirmPassword: ''
  };

  constructor() {}

  ngOnInit() {
    // Load admins (replace with actual API call)
    this.loadAdmins();
  }

  loadAdmins() {
    // Simulated data - replace with actual API call
    this.admins = [
      {
        id: 'A001',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Super Admin',
        permissions: ['User Management', 'Content Management', 'Order Management'],
        status: 'active',
        lastLogin: '2024-03-07 14:30',
        createdAt: '2024-01-01',
        profileImage: 'assets/profile-placeholder.jpg'
      },
       {
        id: 'A001',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Super Admin',
        permissions: ['User Management', 'Content Management', 'Order Management'],
        status: 'active',
        lastLogin: '2024-03-07 14:30',
        createdAt: '2024-01-01',
        profileImage: 'assets/profile-placeholder.jpg'
      },
      // Add more sample data...
    ];
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.admins];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(admin =>
        admin.name.toLowerCase().includes(query) ||
        admin.email.toLowerCase().includes(query)
      );
    }

    if (this.selectedRole) {
      filtered = filtered.filter(admin => admin.role === this.selectedRole);
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(admin => admin.status === this.selectedStatus);
    }

    this.filteredAdmins = filtered;
  }

  openAddModal() {
    this.resetForm();
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.resetForm();
  }

  resetForm() {
    this.newAdmin = {
      name: '',
      email: '',
      role: '',
      permissions: [],
      password: '',
      confirmPassword: ''
    };
  }

  addAdmin() {
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    // Add admin logic here
    console.log('Adding admin:', this.newAdmin);
    this.closeAddModal();
  }

  validateForm(): boolean {
    // Add validation logic
    return true;
  }

  toggleAdminStatus(adminId: string) {
    // Implement status toggle logic
  }

  deleteAdmin(adminId: string) {


    // Implement delete logic
  }

}
