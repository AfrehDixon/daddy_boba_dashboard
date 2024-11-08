export interface Category {
  id: string;
  name: string;
  products: Product[];
}

export interface Venue {
  id: string;
  name: string;
  categories: Category[];
}

 export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
 }

 export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Ice Cream' | 'Gelato' | 'Sorbet' | 'Frozen Yogurt' | 'Toppings' | 'Specials';
  image: string;
  available: boolean;
  ingredients: string[];
  nutritionalInfo?: {
    calories: number;
    allergens: string[];
  };
  featured: boolean;
  seasonal: boolean;
 }

 export interface Order {
  orderId: string;
  date: string;
  time: string;
  customerName: string;
  location: string;
  amount: number;
  status: 'PENDING' | 'DELIVERED' | 'CANCELED' | 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
  items: { name: string; quantity: number; price: number; total: number }[];
  customerDetails: {
    email: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
 }

 export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  joinDate: Date;
  lastVisit: Date;
  totalOrders: number;
  totalSpent: number;
}