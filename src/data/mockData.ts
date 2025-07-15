import { Product, Customer, Sale } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    price: 1199.99,
    stock: 15,
    category: 'Électronique',
    barcode: '123456789012'
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    price: 1299.99,
    stock: 8,
    category: 'Informatique',
    barcode: '123456789013'
  },
  {
    id: '3',
    name: 'AirPods Pro',
    price: 249.99,
    stock: 25,
    category: 'Audio',
    barcode: '123456789014'
  },
  {
    id: '4',
    name: 'iPad Pro 11"',
    price: 899.99,
    stock: 12,
    category: 'Tablette',
    barcode: '123456789015'
  },
  {
    id: '5',
    name: 'Apple Watch Series 8',
    price: 399.99,
    stock: 20,
    category: 'Montre',
    barcode: '123456789016'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    phone: '+33 1 23 45 67 89',
    address: '123 Rue de la Paix, Paris',
    totalPurchases: 2499.98
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@email.com',
    phone: '+33 1 23 45 67 90',
    address: '456 Avenue des Champs, Lyon',
    totalPurchases: 1899.99
  },
  {
    id: '3',
    name: 'Pierre Bernard',
    email: 'pierre.bernard@email.com',
    phone: '+33 1 23 45 67 91',
    address: '789 Boulevard Saint-Germain, Marseille',
    totalPurchases: 3199.97
  }
];

export const mockSales: Sale[] = [
  {
    id: '1',
    customerId: '1',
    items: [
      {
        id: '1',
        product: mockProducts[0],
        quantity: 1,
        total: 1199.99
      }
    ],
    subtotal: 1199.99,
    tax: 239.99,
    total: 1439.98,
    paymentMethod: 'card',
    status: 'completed',
    date: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    customerId: '2',
    items: [
      {
        id: '2',
        product: mockProducts[2],
        quantity: 2,
        total: 499.98
      }
    ],
    subtotal: 499.98,
    tax: 99.99,
    total: 599.97,
    paymentMethod: 'cash',
    status: 'completed',
    date: '2024-01-15T14:20:00Z'
  }
];