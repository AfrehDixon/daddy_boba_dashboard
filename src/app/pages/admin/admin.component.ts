import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AppService } from '../../../services/app.service';
import { finalize } from 'rxjs';

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    HttpClientModule, 
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [HttpClient, AppService],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  admins: Admin[] = [];
  filteredAdmins: Admin[] = [];
  showAddModal = false;
  showEditModal = false;
  searchQuery = '';
  selectedRole = '';
  selectedStatus = '';
  loading = false;
  adminForm!: FormGroup;
  editForm!: FormGroup;
  selectedAdmin: Admin | null = null;

  roles = ['super_admin', 'admin', 'staff'];

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
    this.createEditForm();
  }

  ngOnInit() {
    this.loadAdmins();
  }

  createForm() {
    this.adminForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['admin', Validators.required],
    });
  }

  createEditForm() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  showSnackBar(message: string, isError = false) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isError ? ['error-snackbar'] : ['success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  loadAdmins() {
    this.loading = true;
    this.appService.getAdmin()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.admins = response.data;
          this.filteredAdmins = this.admins;
        },
        error: (error) => {
          console.error('Error loading admins:', error);
          this.showSnackBar('Failed to load admins: ' + error, true);
        }
      });
  }

  addAdmin() {
    if (this.adminForm.invalid) {
      return;
    }

    const payload = {
      name: this.adminForm.value.name,
      email: this.adminForm.value.email,
      role: this.adminForm.value.role
    };

    this.loading = true;
    
    this.appService.addAdmin(payload)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.showSnackBar('Admin added successfully');
          this.loadAdmins();
          this.closeAddModal();
          this.adminForm.reset();
        },
        error: (error) => {
          console.error('Error adding admin:', error);
          this.showSnackBar('Failed to add admin: ' + error, true);
        }
      });
  }

  updateAdmin() {
    if (this.editForm.invalid || !this.selectedAdmin) {
      return;
    }

    const payload = {
      name: this.editForm.value.name,
      email: this.editForm.value.email,
      role: this.editForm.value.role
    };

    this.loading = true;
    
    this.appService.updateAdmin(this.selectedAdmin._id, payload)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.showSnackBar('Admin updated successfully');
          this.loadAdmins();
          this.closeEditModal();
        },
        error: (error) => {
          console.error('Error updating admin:', error);
          this.showSnackBar('Failed to update admin: ' + error, true);
        }
      });
  }

  deleteAdmin(adminId: string) {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.loading = true;
      
      this.appService.deleteAdmin(adminId)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response) => {
            this.showSnackBar('Admin deleted successfully');
            this.loadAdmins();
          },
          error: (error) => {
            console.error('Error deleting admin:', error);
            this.showSnackBar('Failed to delete admin: ' + error, true);
          }
        });
    }
  }

  toggleAdminStatus(adminId: string, currentStatus: boolean) {
    const newStatus = !currentStatus;
    const action = newStatus ? 'activate' : 'deactivate';
    
    if (confirm(`Are you sure you want to ${action} this admin?`)) {
      this.loading = true;
      
      this.appService.toggleAdminStatus(adminId, newStatus)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response) => {
            this.showSnackBar(`Admin ${action}d successfully`);
            this.loadAdmins();
          },
          error: (error) => {
            console.error('Error toggling admin status:', error);
            this.showSnackBar(`Failed to ${action} admin: ` + error, true);
          }
        });
    }
  }

  openAddModal() {
    this.adminForm.reset({role: 'admin'});
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
    this.adminForm.reset();
  }

  openEditModal(admin: Admin) {
    this.selectedAdmin = admin;
    this.editForm.patchValue({
      name: admin.name,
      email: admin.email,
      role: admin.role
    });
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedAdmin = null;
    this.editForm.reset();
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
      const isActive = this.selectedStatus === 'active';
      filtered = filtered.filter(admin => admin.isActive === isActive);
    }
 
    this.filteredAdmins = filtered;
  }

  get f() { 
    return this.adminForm.controls;
  }
}