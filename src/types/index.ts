export interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export interface Product {
  createdAt: string | number | Date;
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  categoryId: string;
  sku?: string;
  image?: string;
  variant?: string;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  icon?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  
  phone?: string;
  totalPurchases: number;
}

export interface Sale {
  id: string;
  customerId?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'partial';
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
  advance?: number;
}

export type PaymentStatus = 'paid' | 'partial' | 'cancelled';