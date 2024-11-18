import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs';
import { AppService } from '../../../services/app.service';

interface Category {
  _id: string;
  name: string;
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  imageUrl?: string;
  inStock: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  categories: Category[] = [];
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  loading = false;
  showingCategoryForm = false;
  showingItemForm = false;
  searchTerm = '';
  selectedCategory = '';
  
  categoryForm!: FormGroup;
  menuItemForm!: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private menuService: AppService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.createForms();
  }

  ngOnInit() {
    this.loadCategories();
    this.loadMenuItems();
  }

  createForms() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]]
    });

    this.menuItemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: [null, Validators.required]
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

  loadCategories() {
    this.loading = true;
    this.menuService.getAllCategories()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.categories = response.data;
        },
        error: (error) => {
          this.showSnackBar(error, true);
        }
      });
  }

  loadMenuItems() {
    this.loading = true;
    this.menuService.getAllItems()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.menuItems = response.data;
          this.applyFilters();
        },
        error: (error) => {
          this.showSnackBar(error, true);
        }
      });
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;

    this.loading = true;
    this.menuService.addCategory(this.categoryForm.value)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.showSnackBar('Category added successfully');
          this.categories.push(response.data);
          this.closeCategoryForm();
          this.loadCategories();
        },
        error: (error) => {
          this.showSnackBar(error, true);
        }
      });
  }

  saveMenuItem() {
    if (this.menuItemForm.invalid || !this.selectedFile) {
      this.showSnackBar('Please fill all required fields', true);
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    Object.keys(this.menuItemForm.value).forEach(key => {
      if (key !== 'image') {
        formData.append(key, this.menuItemForm.value[key]);
      }
    });

    this.loading = true;
    this.menuService.addMenuItem(formData)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.showSnackBar('Menu item added successfully');
          this.menuItems.push(response.data);
          this.closeMenuItemForm();
          this.loadMenuItems();
        },
        error: (error) => {
          this.showSnackBar(error, true);
        }
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.menuItemForm.patchValue({ image: file });
    }
  }

  filterByCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredMenuItems = this.menuItems.filter(item => {
      const matchesSearch = !this.searchTerm || 
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = !this.selectedCategory || 
        item.category._id === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  showCategoryForm() {
    this.showingCategoryForm = true;
  }

  closeCategoryForm() {
    this.showingCategoryForm = false;
    this.categoryForm.reset();
  }

  showMenuItemForm() {
    this.showingItemForm = true;
  }

  closeMenuItemForm() {
    this.showingItemForm = false;
    this.menuItemForm.reset();
    this.selectedFile = null;
  }

  deleteMenuItem(id: string) {
    if (confirm('Are you sure you want to delete this menu item?')) {
      this.loading = true;
      
      this.menuService.deleteMenuItem(id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response) => {
            this.showSnackBar('Menu item deleted successfully');
            this.loadMenuItems();
          },
          error: (error) => {
            console.error('Error deleting item:', error);
            this.showSnackBar(error, true);
          }
        });
    }
  }

  toggleItemAvailability(item: MenuItem) {
    const action = item.inStock ? 'mark as unavailable' : 'mark as available';
    if (confirm(`Are you sure you want to ${action} this item?`)) {
      this.loading = true;
      
      this.menuService.toggleItemStock(item._id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: (response) => {
            this.showSnackBar(`Item ${item.inStock ? 'marked as unavailable' : 'marked as available'} successfully`);
            this.loadMenuItems();
          },
          error: (error) => {
            console.error('Error toggling item status:', error);
            this.showSnackBar(error, true);
          }
        });
    }
  }
}