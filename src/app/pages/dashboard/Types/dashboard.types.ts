export interface MetricCard {
    title: string;
    value: number;
    icon: string;
    trend?: string;
    chartData: any;
    today: number;
  }
  
  export interface DashboardMetrics {
    totalMenus: number;
    totalOrders: number;
    totalCustomers: number;
    totalIncome: number;
    todayStats: {
      menus: number;
      orders: number;
      customers: number;
      income: number;
    };
    menuChartData: number[];
    orderChartData: number[];
    customerChartData: number[];
    incomeChartData: number[];
  }
  
  export interface OrderSummary {
    onDelivery: { amount: number; percentage: number };
    shipped: { amount: number; percentage: number };
    confirmed: { amount: number; percentage: number };
  }