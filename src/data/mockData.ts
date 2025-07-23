import { Product, Customer, Sale, Category } from '../types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Vêtement', color: 'bg-blue-500' },
  { id: '2', name: 'Chaussure', color: 'bg-green-500' },
  { id: '3', name: 'Montre', color: 'bg-purple-500' },
  { id: '4', name: 'Casquette', color: 'bg-orange-500' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fleece Joggers',
    price: 79.99,
    stock: 15,
    category: 'Vêtement',
    categoryId: '1',
    sku: 'CH-885',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    variant: 'Variant'
  },
  {
    id: '2',
    name: 'Fleece Joggers',
    price: 79.99,
    stock: 8,
    category: 'Vêtement',
    categoryId: '1',
    sku: 'CH-885',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    variant: 'Variant'
  },
  {
    id: '3',
    name: 'Fleece Joggers',
    price: 79.99,
    stock: 25,
    category: 'Chaussure',
    categoryId: '2',
    sku: 'CH-885',
    variant: 'Variant'
  },
  {
    id: '4',
    name: 'Fleece Joggers',
    price: 79.99,
    stock: 12,
    category: 'Chaussure',
    categoryId: '2',
    sku: 'CH-885',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    variant: 'Variant'
  },
  {
    id: '5',
    name: 'Fleece Joggers',
    price: 79.99,
    stock: 20,
    category: 'Montre',
    categoryId: '3',
    sku: 'CH-885',
    variant: 'Variant'
  },
  {
    id: '6',
    name: 'Fleece Joggers',
    price: 79.99,
    stock: 18,
    category: 'Casquette',
    categoryId: '4',
    sku: 'CH-885',
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
    variant: 'Variant'
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Dramane Sow',
    phone: '+33 1 23 45 67 89',
    totalPurchases: 2499.98
  },
  {
    id: '2',
    name: 'Marie Martin',
    phone: '+33 1 23 45 67 90',
    totalPurchases: 1899.99
  },
  {
    id: '3',
    name: 'Pierre Bernard',
    phone: '+33 1 23 45 67 91',
    totalPurchases: 3199.97
  },
  {
    id: '4',
    name: 'Sophie Dubois',
    phone: '+33 1 23 45 67 92',
    totalPurchases: 1599.50
  },
  {
    id: '5',
    name: 'Ahmed Benali',
    phone: '+33 1 23 45 67 93',
    totalPurchases: 2850.75
  },
  {
    id: '6',
    name: 'Isabelle Moreau',
    phone: '+33 1 23 45 67 94',
    totalPurchases: 4200.25
  }
];

// Données des fournisseurs
export const mockSuppliers: Customer[] = [
  {
    id: 's1',
    name: 'Textile France SARL',
    phone: '+33 1 45 67 89 01',
    totalPurchases: 45000.00
  },
  {
    id: 's2',
    name: 'Mode & Style Distribution',
    phone: '+33 1 45 67 89 02',
    totalPurchases: 32500.50
  },
  {
    id: 's3',
    name: 'Chaussures Premium',
    phone: '+33 1 45 67 89 03',
    totalPurchases: 28750.75
  },
  {
    id: 's4',
    name: 'Accessoires & Co',
    phone: '+33 1 45 67 89 04',
    totalPurchases: 19800.25
  },
  {
    id: 's5',
    name: 'Horlogerie Moderne',
    phone: '+33 1 45 67 89 05',
    totalPurchases: 52300.00
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