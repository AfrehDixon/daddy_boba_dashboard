import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';


interface Category {
  id: string;
  name: string;
  description?: string;
}

interface MenuItem {
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

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule ,MatButtonModule, MatIconModule ,FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})


export class MenuComponent {
  showingCategoryForm = false;
  categoryForm = { name: '' };

categories: Category[] = [];
  // menuItems: MenuItem[
    
  // ] = [];
  searchTerm = '';
  currentCategoryId = '';

  // Form states
  // showingCategoryForm = false;
  showingItemForm = false;
  editingCategory: Category | null = null;
  editingItem: MenuItem | null = null;

  // Form models
  // categoryForm = {
  //   name: '',
  //   // description: ''
  // };

  addCategory() {
    // const newCategory = prompt('Enter new category name:');
    this.showingCategoryForm = true;

  // if (newCategory && !this.categories.some(category => category.name === newCategory)) {
  //   const category: Category = {
  //     id: Date.now().toString(),
  //     name: newCategory,
  //     description: ''
  //   };
  //   this.categories.push(category);
  // }
  }
  
  //   showCategoryForm(venueId: string, category?: Category) {
  //   this.showingCategoryForm = true;
  //   this.currentVenueId = venueId;
  //   if (category) {
  //     this.editingCategory = category;
  //     this.categoryForm.name = category.name;
  //   }
  // }

  menuItemForm = {
    name: '',
    description: '',
    price: 0,
    category: 'Ice Cream', // Default category or set it dynamically
    available: true,
    featured: false,
    seasonal: false,
    ingredients: []
  };
  selectedCategory: any;
venue: any;

  ngOnInit() {
    // Load initial data
  }

  //  editCategory(category: Category) {
  //   this.showCategoryForm(category);
  //  }
  
  getItemsByCategory(categoryId: string): MenuItem[] {
    return this.menuItems
      .filter(item => item.category === categoryId)
      .filter(item => 
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
  }

    closeCategoryForm() {
    this.showingCategoryForm = false;
    this.editingCategory = null;
    this.categoryForm = { name: '' };
    // this.currentVenueId = '';
  }

  editMenuItem(item: MenuItem) {
    this.showMenuItemForm(item.category, item);
  }

  // Category Methods
  showCategoryForm() {
    this.showingCategoryForm = true;
    // if (category) {
    //   this.editingCategory = category;
    //   this.categoryForm = {
    //     name: category.name,
    //     // description: category.description || ''
    //   };
    // }
  }



  saveCategory() {
    if (this.editingCategory) {
      // Update existing category
      const index = this.categories.findIndex(c => c.id === this.editingCategory!.id);
      this.categories[index] = {
        ...this.editingCategory,
        ...this.categoryForm
      };
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now().toString(),
        ...this.categoryForm
      };
      this.categories.push(newCategory);
    }
    this.closeCategoryForm();
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure? This will also delete all items in this category.')) {
      this.categories = this.categories.filter(c => c.id !== id);
      this.menuItems = this.menuItems.filter(item => item.category !== id);
    }
  }

  // Menu Item Methods
  // showMenuItemForm(categoryId: string, item?: MenuItem) {
  //   this.currentCategoryId = categoryId;
  //   this.showingItemForm = true;
  //   if (item) {
  //     this.editingItem = item;
  //     this.menuItemForm = {
  //       name: item.name,
  //       description: item.description,
  //       price: item.price,
  //       available: item.available,
  //       featured: item.featured,
  //       seasonal: item.seasonal,
  //       ingredients: [...item.ingredients]
  //     };
  //   }
  // }

  // closeMenuItemForm() {
  //   this.showingItemForm = false;
  //   this.editingItem = null;
  //   this.currentCategoryId = '';
  //   this.menuItemForm = {
  //     name: '',
  //     description: '',
  //     price: 0,
  //     available: true,
  //     featured: false,
  //     seasonal: false,
  //     ingredients: []
  //   };
  // }

  menuItems: MenuItem[] = [
     {
    id: '1',
    name: 'Vanilla Bean Supreme',
    description: 'Rich and creamy vanilla ice cream made with real Madagascar vanilla beans',
    price: 12.99,
    category: 'Ice Cream',
    image: '/assets/images/vanilla-bean.jpg',
    available: true,
    ingredients: ['Cream', 'Milk', 'Sugar', 'Madagascar Vanilla Beans', 'Egg Yolks'],
    nutritionalInfo: {
      calories: 250,
      allergens: ['Milk', 'Eggs']
    },
    featured: true,
    seasonal: false,
    // createdAt: new Date('2024-01-01'),
    // updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Double Chocolate Fudge',
    description: 'Decadent chocolate ice cream with rich fudge swirls and chocolate chips',
    price: 14.99,
    category: 'Ice Cream',
    image: '/assets/images/chocolate-fudge.jpg',
    available: true,
    ingredients: ['Cream', 'Milk', 'Cocoa', 'Chocolate Chips', 'Fudge Sauce'],
    // Toppings : ['Boba,Apple Poppins , Grape Poppins'],
    nutritionalInfo: {
      calories: 320,
      allergens: ['Milk', 'Soy']
    },
    featured: true,
    seasonal: false,
    // createdAt: new Date('2024-01-02'),
    // updatedAt: new Date('2024-01-02')
  },

  // Gelato Category
  {
    id: '3',
    name: 'Pistachio Gelato',
    description: 'Authentic Italian-style gelato made with premium Sicilian pistachios',
    price: 15.99,
    category: 'Gelato',
    image: '/assets/images/pistachio-gelato.jpg',
    available: true,
    ingredients: ['Milk', 'Cream', 'Pistachios', 'Sugar', 'Natural Flavoring'],
    nutritionalInfo: {
      calories: 280,
      allergens: ['Milk', 'Nuts']
    },
    featured: true,
    seasonal: false,
    // createdAt: new Date('2024-01-03'),
    // updatedAt: new Date('2024-01-03')
  },
  {
    id: '4',
    name: 'Stracciatella Gelato',
    description: 'Smooth milk gelato with fine chocolate shavings throughout',
    price: 15.99,
    category: 'Gelato',
    image: '/assets/images/stracciatella.jpg',
    available: true,
    ingredients: ['Milk', 'Cream', 'Sugar', 'Dark Chocolate', 'Vanilla'],
    nutritionalInfo: {
      calories: 290,
      allergens: ['Milk', 'Soy']
    },
    featured: false,
    seasonal: false,
    // createdAt: new Date('2024-01-04'),
    // updatedAt: new Date('2024-01-04')
  },

  // Sorbet Category
  {
    id: '5',
    name: 'Mango Passion Sorbet',
    description: 'Refreshing dairy-free sorbet made with ripe mangoes and a hint of passion fruit',
    price: 11.99,
    category: 'Sorbet',
    image: '/assets/images/mango-sorbet.jpg',
    available: true,
    ingredients: ['Mangoes', 'Passion Fruit', 'Sugar', 'Water', 'Natural Flavors'],
    nutritionalInfo: {
      calories: 120,
      allergens: []
    },
    featured: false,
    seasonal: true,
    // createdAt: new Date('2024-01-05'),
    // updatedAt: new Date('2024-01-05')
  },
  {
    id: '6',
    name: 'Raspberry Lemon Sorbet',
    description: 'Tangy and sweet sorbet blend of fresh raspberries and lemon',
    price: 11.99,
    category: 'Sorbet',
    image: '/assets/images/raspberry-sorbet.jpg',
    available: true,
    ingredients: ['Raspberries', 'Lemons', 'Sugar', 'Water'],
    nutritionalInfo: {
      calories: 110,
      allergens: []
    },
    featured: false,
    seasonal: true,
    // createdAt: new Date('2024-01-06'),
    // updatedAt: new Date('2024-01-06')
  },

  // Frozen Yogurt Category
  {
    id: '7',
    name: 'Classic Tart Frozen Yogurt',
    description: 'Tangy and creamy original frozen yogurt with live probiotic cultures',
    price: 10.99,
    category: 'Frozen Yogurt',
    image: '/assets/images/classic-froyo.jpg',
    available: true,
    ingredients: ['Yogurt', 'Milk', 'Sugar', 'Probiotics'],
    nutritionalInfo: {
      calories: 140,
      allergens: ['Milk']
    },
    featured: false,
    seasonal: false,
    // createdAt: new Date('2024-01-07'),
    // updatedAt: new Date('2024-01-07')
  },
  {
    id: '8',
    name: 'Berry Blast Frozen Yogurt',
    description: 'Mixed berry frozen yogurt with real fruit pieces',
    price: 12.99,
    category: 'Frozen Yogurt',
    image: '/assets/images/berry-froyo.jpg',
    available: true,
    ingredients: ['Yogurt', 'Mixed Berries', 'Sugar', 'Milk'],
    nutritionalInfo: {
      calories: 150,
      allergens: ['Milk']
    },
    featured: false,
    seasonal: true,
    // createdAt: new Date('2024-01-08'),
    // updatedAt: new Date('2024-01-08')
  },

  // Toppings Category
  {
    id: '9',
    name: 'Premium Nut Mix',
    description: 'Mix of toasted almonds, pecans, and walnuts',
    price: 2.99,
    category: 'Toppings',
    image: '/assets/images/nut-mix.jpg',
    available: true,
    ingredients: ['Almonds', 'Pecans', 'Walnuts'],
    nutritionalInfo: {
      calories: 160,
      allergens: ['Nuts']
    },
    featured: false,
    seasonal: false,
    // createdAt: new Date('2024-01-09'),
    // updatedAt: new Date('2024-01-09')
  },
  {
    id: '10',
    name: 'Fresh Fruit Medley',
    description: 'Assorted fresh seasonal fruits',
    price: 3.99,
    category: 'Toppings',
    image: '/assets/images/fruit-medley.jpg',
    available: true,
    ingredients: ['Strawberries', 'Blueberries', 'Mango', 'Kiwi'],
    nutritionalInfo: {
      calories: 50,
      allergens: []
    },
    featured: false,
    seasonal: true,
    // createdAt: new Date('2024-01-10'),
    // updatedAt: new Date('2024-01-10')
  },

  // Specials Category
  {
    id: '11',
    name: 'Banana Split Supreme',
    description: 'Classic banana split with three scoops of ice cream, toppings, and whipped cream',
    price: 18.99,
    category: 'Specials',
    image: '/assets/images/banana-split.jpg',
    available: true,
    ingredients: ['Bananas', 'Vanilla Ice Cream', 'Chocolate Ice Cream', 'Strawberry Ice Cream', 'Whipped Cream', 'Nuts', 'Cherry'],
    nutritionalInfo: {
      calories: 850,
      allergens: ['Milk', 'Nuts']
    },
    featured: true,
    seasonal: false,
    // createdAt: new Date('2024-01-11'),
    // updatedAt: new Date('2024-01-11')
  },
  {
    id: '12',
    name: 'Brownie Sundae Delight',
    description: 'Warm chocolate brownie topped with vanilla ice cream and hot fudge',
    price: 16.99,
    category: 'Specials',
    image: '/assets/images/brownie-sundae.jpg',
    available: true,
    ingredients: ['Brownie', 'Vanilla Ice Cream', 'Hot Fudge', 'Whipped Cream', 'Chocolate Chips'],
    nutritionalInfo: {
      calories: 720,
      allergens: ['Milk', 'Eggs', 'Wheat']
    },
    featured: true,
    seasonal: false,
    // createdAt: new Date('2024-01-12'),
    // updatedAt: new Date('2024-01-12')
  }
  ];


  get filteredMenuItems() {
    return this.menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || item.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }

  showMenuItemForm(category: string, item?: MenuItem) {
    this.showingItemForm = true;
    if (item) {
      this.editingItem = item;
      // this.menuItemForm = {
      //   name: item.name,
      //   description: item.description,
      //   price: item.price,
      //   category: item.category,
      //   available: item.available,
      //   // ingredients: [...item.ingredients],
      //   featured: item.featured,
      //   seasonal: item.seasonal
      // };
    }
  }


    filterByCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? '' : category;
    }
  
   toggleAvailability(item: MenuItem) {
    item.available = !item.available;
   }
  
   deleteMenuItem(id: string) {
    if (confirm('Are you sure you want to delete this menu item? This action cannot be undone.')) {
      this.menuItems = this.menuItems.filter(item => item.id !== id);
    }
   }
  
  saveMenuItem() {
    if (this.editingItem) {
      // Update existing item
      const index = this.menuItems.findIndex(item => item.id === this.editingItem!.id);
      // this.menuItems[index] = {
      //   ...this.editingItem,
      //   ...this.menuItemForm,
      //   // updatedAt: new Date()
      // };
    }
    else {
      // Add new item
      // const newItem: MenuItem = {
      //   id: Date.now().toString(),
      //   ...this.menuItemForm,
      //   // image: this.defaultImage, // Replace with actual image handling
      //   nutritionalInfo: {
      //     calories: 0,
      //     allergens: []
      //   },
      //   // createdAt: new Date(),
      //   // updatedAt: new Date()
      // };
      // this.menuItems.unshift(newItem);
    }
    // this.closeMenuItemForm();
  }

   closeMenuItemForm() {
    this.showingItemForm = false;
    this.editingItem = null;
    // this.resetForm();
   }
  


}
