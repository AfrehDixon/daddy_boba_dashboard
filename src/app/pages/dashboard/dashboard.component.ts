import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { AppService } from '../../../services/app.service';
import { DashboardMetrics, MetricCard, OrderSummary } from './Types/dashboard.types';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartModule, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  metricCards: MetricCard[] = [];
  orderSummary?: OrderSummary;
  revenueData: any;
  loading = true;
  error = '';

  miniChartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    responsive: true,
    maintainAspectRatio: false,
    barPercentage: 0.6
  };

  revenueOptions = {
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: string) => '$' + value
        },
        grid: {
          color: '#f1f5f9'
        }
      },
      x: {
        grid: { display: false }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  donutOptions = {
    cutout: '80%',
    rotation: -90,
    circumference: 180,
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private dashboardService: AppService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  private loadDashboardData() {
    this.dashboardService.getDashboardData().subscribe({
      next: (response) => {
        if (response.success) {
          this.processMetrics(response.data.metrics);
          this.orderSummary = response.data.orderSummary;
          this.setupRevenueChart(response.data.revenueAnalytics);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load dashboard data';
        this.loading = false;
        console.error(err);
      }
    });
  }

  private processMetrics(metrics: DashboardMetrics) {
    this.metricCards = [
      {
        title: 'Total Menus',
        value: metrics.totalMenus,
        icon: 'pi pi-box',
        chartData: this.getChartData(metrics.menuChartData || [0]), // Default to [0]
        today: metrics.todayStats.menus
      },
      {
        title: 'Total Orders',
        value: metrics.totalOrders,
        icon: 'pi pi-shopping-cart',
        trend: '+15%',
        chartData: this.getChartData(metrics.orderChartData || [0]), // Default to [0]
        today: metrics.todayStats.orders
      },
      {
        title: 'Total Customers',
        value: metrics.totalCustomers,
        icon: 'pi pi-users',
        chartData: this.getChartData(metrics.customerChartData || [0]), // Default to [0]
        today: metrics.todayStats.customers
      },
      {
        title: 'Total Income',
        value: metrics.totalIncome,
        icon: 'pi pi-dollar',
        chartData: this.getChartData(metrics.incomeChartData || [0]), // Default to [0]
        today: metrics.todayStats.income
      }
    ];
  }
  

  private getChartData(data: number[]) {
    return {
      labels: Array(data.length).fill(''),
      datasets: [{
        data: data,
        backgroundColor: '#4169E1',
        borderRadius: 4
      }]
    };
  }

  private setupRevenueChart(analytics: { labels: string[]; data: number[] }) {
    this.revenueData = {
      labels: analytics.labels,
      datasets: [{
        data: analytics.data,
        backgroundColor: 'rgb(81, 36, 36)',
        barThickness: 30,
        borderRadius: 4
      }]
    };
  }

  getDonutData(percentage: number) {
    return {
      datasets: [{
        data: [percentage, 100 - percentage],
        backgroundColor: ['currentColor', '#f1f5f9'],
        borderWidth: 0
      }]
    };
  }
}