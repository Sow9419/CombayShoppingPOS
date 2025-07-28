import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface BestSellerItemProps {
  product: {
    id: string;
    name: string;
    image?: string;
    stock: number;
    price: number;
    lastSaleDate: string;
    lastSaleTime: string;
  };
}

const BestSellerItem: React.FC<BestSellerItemProps> = ({ product }) => {
  return (
    <div className="flex items-center space-x-3 p-2 bg-zinc-100 dark:bg-gray-700 hover:bg-zinc-200 hover:dark:bg-gray-700 rounded-lg transition-colors cursor-pointer">
      <div className="w-12 h-12 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
            <span className="text-black dark:text-white text-xs font-bold">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-black dark:text-white font-medium text-sm truncate">{product.name}</h4>
        <div className="flex items-center justify-between mt-1">
          <span className="text-yellow-900 dark:text-yellow-400 text-xs font-medium">Stock : {product.stock}</span>
          <span className="text-black dark:text-white font-semibold text-sm">PV {product.price.toFixed(0)}FCFA</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
          {product.lastSaleDate} {product.lastSaleTime}
        </p>
      </div>
      
      <button className="text-gray-900 dark:text-gray-400 hover:text-white p-1">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
};

interface BestSellersPanelProps {
  period?: string;
}

const BestSellersPanel: React.FC<BestSellersPanelProps> = ({ period = "Aujourd'hui" }) => {
  const bestSellers = [
    {
      id: '1',
      name: 'Leather Wallet',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 4,
      price: 5000,
      lastSaleDate: '14/07/2025',
      lastSaleTime: '16:22'
    },
    {
      id: '2',
      name: 'Leather Wallet',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 4,
      price: 5000,
      lastSaleDate: '14/07/2025',
      lastSaleTime: '16:22'
    },
    {
      id: '3',
      name: 'Leather Wallet',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 4,
      price: 5000,
      lastSaleDate: '14/07/2025',
      lastSaleTime: '16:22'
    },
    {
      id: '4',
      name: 'Leather Wallet',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 4,
      price: 5000,
      lastSaleDate: '14/07/2025',
      lastSaleTime: '16:22'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-3">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-black dark:text-white font-semibold">Meilleur produit - {period}</h3>
        <button className="text-blue-600 dark:text-green-400 text-sm font-medium hover:text-green-300">
          Tout
        </button>
      </div>
      
      <div className="max-h-80 overflow-y-auto no-scrollbar space-y-2">
        {bestSellers.map(product => (
          <BestSellerItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellersPanel;