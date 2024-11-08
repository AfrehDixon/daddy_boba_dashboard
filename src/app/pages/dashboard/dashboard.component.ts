import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    AvatarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
[x: string]: any;
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

  // Revenue Chart
  revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      data: [45, 30, 35, 25, 35, 50, 35, 40, 30, 35, 25, 40],
      backgroundColor: 'rgb(81, 36, 36)',
      barThickness: 30,
      borderRadius: 4
    }]
  };

  revenueOptions = {
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 60,
        ticks: {
          stepSize: 10,
          callback: (value: string) => value + '%'
        },
        grid: {
          color: '#f1f5f9',
          drawBorder: false
        }
      },
      x: {
        grid: { display: false }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  // Donut Chart Options
  donutOptions = {
    cutout: '80%',
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  getDonutData(value: number) {
    return {
      datasets: [{
        data: [value, 100 - value],
        backgroundColor: ['currentColor', '#f1f5f9'],
        borderWidth: 0
      }]
    };
  }

    recentOrders = [
    {
      name: 'Strawberry Ice Cream with Choco',
      customerName: 'Kristin Watson',
      price: 15.5,
      status: 'Pending',
      image: 'assets/strawberry-ice.jpg'
    },
    {
      name: 'Chocolate Ice Cream with Nuts',
      customerName: 'Jimmy Coastal',
      price: 13.5,
      status: 'Confirmed',
      image: 'assets/chocolate-ice.jpg'
    }
    // Add more orders as needed
  ];
  
  trendingMenus = [
    {
      name: 'Strawberry Ice Cream with Vanilla',
      rating: 4.5,
      image: 'assets/strawberry-vanilla.jpg'
    },
    {
      name: 'Chocolate Ice Cream with Choco Biscuit',
      rating: 4.5,
      image: 'assets/chocolate-biscuit.jpg'
    },
    {
      name: 'Milkshake Ice Cream with Strawberry',
      rating: 5.0,
      image: 'assets/milkshake-strawberry.jpg'
    },
    {
      name: 'Fruit Ice Cream with Nuts',
      rating: 4.5,
      image: 'assets/fruit-nuts.jpg'
    }
  ];


  salesData = {
    labels: ['Total Order', 'Running Order', 'Customer Growth', 'Total Revenue'],
    datasets: [{
      data: [35, 20, 28, 17],
      backgroundColor: ['#FF4500', '#00CED1', '#32CD32', '#4169E1']
    }]
  };

  salesChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Order Saved',
      data: [30, 40, 35, 50, 45, 30, 35, 40, 45, 35, 40, 35],
      backgroundColor: '#00CED1',
      borderRadius: 6,
      barThickness: 12,
    },
    {
      label: 'Order Received',
      data: [25, 35, 30, 45, 40, 25, 30, 35, 40, 30, 35, 30],
      backgroundColor: 'rgb(81, 36, 36)',
      borderRadius: 6,
      barThickness: 12,
    }
  ]
};

salesChartOptions = {
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11
        },
        color: '#64748b'
      }
    },
    y: {
      grid: {
        color: '#f1f5f9',
        drawBorder: false
      },
      ticks: {
        font: {
          size: 11
        },
        color: '#64748b',
        padding: 8
      },
      beginAtZero: true
    }
  },
  responsive: true,
  maintainAspectRatio: false
};

// Popular Time Chart
popularTimeData = {
  labels: ['9am', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
  datasets: [{
    data: [30, 45, 35, 50, 40, 35, 45],
    backgroundColor: [
      '#32CD32',
      'rgb(81, 36, 36)',
      '#32CD32',
      'rgb(81, 36, 36)',
      '#32CD32',
      'rgb(81, 36, 36)',
      '#32CD32'
    ],
    borderRadius: 6,
    barThickness: 20,
  }]
};

popularTimeOptions = {
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      display: false
    }
  },
  responsive: true,
  maintainAspectRatio: false
};

// Payment Method Chart
paymentMethodData = {
  labels: ['Cash on Delivery', 'Online Payment'],
  datasets: [{
    data: [65, 35],
    backgroundColor: ['#32CD32', '#4169E1'],
    borderWidth: 0,
    cutout: '75%'
  }]
};

paymentMethodOptions = {
  plugins: {
    legend: {
      display: false
    }
  },
  responsive: true,
  maintainAspectRatio: false
};

  salesOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 10,
          font: { size: 11 },
          padding: 20
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  orderData = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      data: [150, 220, 180, 265, 210, 150, 180],
      backgroundColor: Array(7).fill('#FF4500'),
      maxBarThickness: 40,
      borderRadius: 6
    }]
  };

  orderOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 300,
        grid: {
          display: true,
          drawBorder: false,
          color: '#f1f5f9'
        },
        ticks: {
          stepSize: 50
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };
  

  constructor() {}

  ngOnInit() {}
}