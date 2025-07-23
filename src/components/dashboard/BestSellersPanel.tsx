import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';

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
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
      <div className="w-12 h-12 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {product.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium text-sm truncate">{product.name}</h4>
        <div className="flex items-center justify-between mt-1">
          <span className="text-yellow-400 text-xs font-medium">Stock : {product.stock}</span>
          <span className="text-white font-semibold text-sm">PV {product.price.toFixed(0)}FCFA</span>
        </div>
        <p className="text-gray-400 text-xs mt-1">
          {product.lastSaleDate} {product.lastSaleTime}
        </p>
      </div>
      
      <button className="text-gray-400 hover:text-white p-1">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
};

interface BestSellersPanelProps {
  period: string;
}

const BestSellersPanel: React.FC<BestSellersPanelProps> = ({ period }) => {
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
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-white font-semibold">Meilleur produit</h3>
        <button className="text-green-400 text-sm font-medium hover:text-green-300">
          Tout
        </button>
      </div>
      
      <div className="max-h-80 overflow-y-auto no-scrollbar">
        {bestSellers.map(product => (
          <BestSellerItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSellersPanel;