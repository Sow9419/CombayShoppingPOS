export interface Items {
  id: string,
  saleId: string,
  categoryId: string,
  productId: string,
  unit_price: string,
  quantity: number,
  total_Amount: string
}

export interface Sale {
  id: string;
  customerId?: string,
  orderNumber: string;
  productName: string;
  date: string;
  time: string;
  avancer: number;
  amount: number;
  paymentStatus: 'paid' | 'partial' | 'cancelled' | 'credit';
  transactionStatus: 'complete' | 'incomplete';
  stock: number;
  
}



export interface Product {
  categoryId: string;
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string; //<-- Peut être présent ou non
  sku: string;
  variant: string;
  createdAt:Date;
}

export interface Category {
  id: string;
  name: string;
  color:string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  totalPurchases: number;
  createdAt:Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  total: number;
}

// Types utilitaires pour les status
export type PaymentStatus = Sale['paymentStatus'];
export type TransactionStatus = Sale['transactionStatus'];