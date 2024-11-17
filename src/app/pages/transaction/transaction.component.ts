// transaction.component.ts
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, DatePipe],
  providers: [DecimalPipe, DatePipe]
})
export class TransactionComponent implements OnInit {
  loading = false;
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  totalAmount = 0;
  successfulTransactions = 0;
  pendingTransactions = 0;
  failedTransactions = 0;
  
  searchQuery = '';
  filters = {
    dateRange: {
      startDate: '',
      endDate: ''
    },
    type: '',
    status: '',
    minAmount: null,
    maxAmount: null
  };

  transactionTypes = ['MOBILE_MONEY'];
  transactionStatuses = ['PENDING', 'SUCCESS', 'FAILED'];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading = true;
    this.appService.getAllTransactions().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.transactions = response.data;
          this.filteredTransactions = [...this.transactions];
          this.updateStatistics();
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.loading = false;
      }
    });
  }

  updateStatistics() {
    this.totalAmount = this.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    this.successfulTransactions = this.transactions.filter(tx => tx.status === 'SUCCESS').length;
    this.pendingTransactions = this.transactions.filter(tx => tx.status === 'PENDING').length;
    this.failedTransactions = this.transactions.filter(tx => tx.status === 'FAILED').length;
  }

  applyFilters() {
    let filtered = [...this.transactions];

    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(tx => 
        tx.transactionReference.toLowerCase().includes(query) ||
        tx.order?.customer?.name?.toLowerCase().includes(query)
      );
    }

    if (this.filters.dateRange.startDate && this.filters.dateRange.endDate) {
      const start = new Date(this.filters.dateRange.startDate);
      const end = new Date(this.filters.dateRange.endDate);
      filtered = filtered.filter(tx => {
        const date = new Date(tx.createdAt);
        return date >= start && date <= end;
      });
    }

    if (this.filters.type) {
      filtered = filtered.filter(tx => tx.type === this.filters.type);
    }

    if (this.filters.status) {
      filtered = filtered.filter(tx => tx.status === this.filters.status);
    }

    this.filteredTransactions = filtered;
  }

  clearFilters() {
    this.searchQuery = '';
    this.filters = {
      dateRange: {
        startDate: '',
        endDate: ''
      },
      type: '',
      status: '',
      minAmount: null,
      maxAmount: null
    };
    this.filteredTransactions = [...this.transactions];
  }

  exportTransactions() {
    // Implement export logic
    console.log('Exporting transactions...');
  }

  viewDetails(id: string) {
    // Implement view details logic
    console.log('Viewing transaction details:', id);
  }
}