
export interface Items {
  id: string,
  saleId: string,
  quatity: number,
  total: string
}

export interface Sale {
  id: string;
  customerId: string,
  itemsId: Items,
  orderNumber: string;
  productName: string;
  date: string;
  time: string;
  amount: number;
  paymentStatus: 'paid' | 'partial' | 'cancelled' | 'credit';
  transactionStatus: 'complete' | 'incomplete';
  stock: number;
  type: 'vetement' | 'chaussure' | 'accessoire';
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

// Types utilitaires pour les status
export type PaymentStatus = Sale['paymentStatus'];
export type TransactionStatus = Sale['transactionStatus'];
export type ProductType = Sale['type'];