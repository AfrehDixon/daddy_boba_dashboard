import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';


interface Transaction {
  id: string;
  date: string;
  time: string;
  customerName: string;
  type: 'credit' | 'debit' | 'transfer';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  reference: string;
}

interface TransactionFilters {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  type: string;
  status: string;
  minAmount: number | null;
  maxAmount: number | null;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {

  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  searchQuery: string = '';
  
  filters: TransactionFilters = {
    dateRange: {
      startDate: '',
      endDate: ''
    },
    type: '',
    status: '',
    minAmount: null,
    maxAmount: null
  };

  transactionTypes = ['credit', 'debit', 'transfer'];
  transactionStatuses = ['completed', 'pending', 'failed'];

  totalAmount: number = 0;
  successfulTransactions: number = 0;
  pendingTransactions: number = 0;
  failedTransactions: number = 0;

  constructor() {}

  ngOnInit() {
    // Load transactions (replace with actual API call)
    this.loadTransactions();
    this.applyFilters();
  }

  loadTransactions() {
    // Simulated data - replace with actual API call
    this.transactions = [
      {
        id: 'TRX001',
        date: '2024-03-07',
        time: '14:30',
        customerName: 'John Doe',
        type: 'credit',
        amount: 1500.00,
        status: 'completed',
        paymentMethod: 'Bank Transfer',
        reference: 'REF001'
      },
       {
        id: 'TRX001',
        date: '2024-03-07',
        time: '14:30',
        customerName: 'John Doe',
        type: 'credit',
        amount: 1500.00,
        status: 'completed',
        paymentMethod: 'Bank Transfer',
        reference: 'REF001'
      },
        {
        id: 'TRX001',
        date: '2024-03-07',
        time: '14:30',
        customerName: 'John Doe',
        type: 'credit',
        amount: 1500.00,
        status: 'completed',
        paymentMethod: 'Bank Transfer',
        reference: 'REF001'
      },
      // Add more sample transactions...
    ];
  }

  applyFilters() {
    let filtered = [...this.transactions];

    // Apply date range filter
    if (this.filters.dateRange.startDate && this.filters.dateRange.endDate) {
      filtered = filtered.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(this.filters.dateRange.startDate);
        const endDate = new Date(this.filters.dateRange.endDate);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }

    // Apply type filter
    if (this.filters.type) {
      filtered = filtered.filter(transaction => 
        transaction.type === this.filters.type
      );
    }

    // Apply status filter
    if (this.filters.status) {
      filtered = filtered.filter(transaction => 
        transaction.status === this.filters.status
      );
    }

    // Apply amount range filter
    if (this.filters.minAmount !== null) {
      filtered = filtered.filter(transaction => 
        transaction.amount >= this.filters.minAmount!
      );
    }
    if (this.filters.maxAmount !== null) {
      filtered = filtered.filter(transaction => 
        transaction.amount <= this.filters.maxAmount!
      );
    }

    // Apply search query
    if (this.searchQuery) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(transaction =>
        transaction.customerName.toLowerCase().includes(query) ||
        transaction.reference.toLowerCase().includes(query) ||
        transaction.id.toLowerCase().includes(query)
      );
    }

    this.filteredTransactions = filtered;
    this.updateStatistics();
  }

  updateStatistics() {
    this.totalAmount = this.filteredTransactions.reduce((sum, transaction) => 
      sum + transaction.amount, 0
    );
    
    this.successfulTransactions = this.filteredTransactions.filter(
      t => t.status === 'completed'
    ).length;
    
    this.pendingTransactions = this.filteredTransactions.filter(
      t => t.status === 'pending'
    ).length;
    
    this.failedTransactions = this.filteredTransactions.filter(
      t => t.status === 'failed'
    ).length;
  }

  clearFilters() {
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
    this.searchQuery = '';
    this.applyFilters();
  }

}
