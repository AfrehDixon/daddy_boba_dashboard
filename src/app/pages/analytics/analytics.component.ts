import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    ChartModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    AvatarModule,
  ],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  // Add Top Flavors data
 favoriteIceCreams = [
    {
      name: 'Strawberry Ice Cream with Fruits',
      sales: '2,645',
      percentage: 80,
      image: 'assets/strawberry.jpg',
      circleColor: 'rgba(255, 20, 147, 0.1)'
    },
    {
      name: 'Chocolate Ice Cream with Nuts',
      sales: '2,441',
      percentage: 63,
      image: 'assets/chocolate.jpg',
      circleColor: 'rgba(255, 20, 147, 0.1)'
    },
    {
      name: 'Cone Ice Creams',
      sales: '3,515',
      percentage: 50,
      image: 'assets/cone.jpg',
      circleColor: 'rgba(255, 20, 147, 0.1)'
    },
    {
      name: 'Pistachio Ice Creams with Nuts',
      sales: '2,245',
      percentage: 23,
      image: 'assets/pistachio.jpg',
      circleColor: 'rgba(255, 20, 147, 0.1)'
    },
    {
      name: 'Milkshake Ice Creams',
      sales: '3,245',
      percentage: 45,
      image: 'assets/milkshake.jpg',
      circleColor: 'rgba(255, 20, 147, 0.1)'
    },
    {
      name: 'Fruits Ice Creams with Nuts',
      sales: '2,347',
      percentage: 55,
      image: 'assets/fruits.jpg',
      circleColor: 'rgba(255, 20, 147, 0.1)'
   },
    {
      name: 'Fruits Ice Creams with Nuts',
      sales: '2,347',
      percentage: 55,
      image: 'assets/fruits.jpg',
      circleColor: 'rgba(255, 20, 147, 0.1)'
   },
    {
      name: 'Fruits Ice Creams with Nuts',
      sales: '2,347',
      percentage: 55,
      image: 'assets/fruits.jpg',
      circleColor: 'rgba(255, 20, 147, 0.1)'
    }
  ];

  topFlavors = [
  {
    name: 'Vanilla Ice Cream',
    percentage: 85,
    progressClass: 'vanilla-progress',
    buttonClass: 'vanilla-button'
  },
  {
    name: 'Strawberry Ice Cream',
    percentage: 75,
    progressClass: 'strawberry-progress',
    buttonClass: 'strawberry-button'
  },
  {
    name: 'Chocolate Ice Cream',
    percentage: 65,
    progressClass: 'chocolate-progress',
    buttonClass: 'chocolate-button'
  },
  {
    name: 'Pistachio Ice Cream',
    percentage: 55,
    progressClass: 'pistachio-progress',
    buttonClass: 'pistachio-button'
  },
  {
    name: 'Milkshake Ice Cream',
    percentage: 45,
    progressClass: 'milkshake-progress',
    buttonClass: 'milkshake-button'
  }
  ];

salesDetailsData = {
    labels: ['Total Order', 'Running Order', 'Customer Growth', 'Total Revenue'],
    datasets: [{
      data: [35, 20, 28, 17],
      backgroundColor: ['#FF4500', '#00CED1', '#32CD32', '#4169E1'],
      borderWidth: 0
    }]
  };

  salesDetailsOptions = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 10,
          padding: 20,
          font: { size: 12 }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  // Order Chart
  orderChartData = {
    labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      data: [150, 220, 180, 265, 210, 150, 180],
      backgroundColor: '#FF4500',
      borderRadius: 4,
      barThickness: 30
    }]
  };

  orderChartOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 300,
        ticks: {
          stepSize: 50
        },
        grid: {
          color: '#f1f5f9',
          drawBorder: false
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  // Customer Map
  customerMapData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Retained',
        data: [150, 170, 180, 160, 150, 160, 170, 165, 180, 170, 160, 150],
        backgroundColor: '#FFD700',
        barPercentage: 0.8,
        categoryPercentage: 0.9,
        borderRadius: 4
      },
      {
        label: 'New',
        data: [100, 120, 130, 100, 90, 100, 110, 100, 120, 100, 90, 80],
        backgroundColor: '#00CED1',
        barPercentage: 0.8,
        categoryPercentage: 0.9,
        borderRadius: 4
      }
    ]
  };

  customerMapOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        stacked: true,
        beginAtZero: true,
        max: 350,
        ticks: {
          stepSize: 50
        },
        grid: {
          color: '#f1f5f9',
          drawBorder: false
        }
      },
      x: {
        stacked: true,
        grid: {
          display: false,
          drawBorder: false
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false
  };

  // Target Income
  targetIncomeData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [75, 25],
      backgroundColor: ['#00CED1', '#f3f4f6'],
      borderWidth: 0,
      cutout: '85%'
    }]
  };

  targetIncomeOptions = {
    plugins: {
      legend: {
        display: false
      }
    },
    rotation: 225,
    circumference: 270,
    responsive: true,
    maintainAspectRatio: false
  };

  constructor() {}

  ngOnInit() {}
}
