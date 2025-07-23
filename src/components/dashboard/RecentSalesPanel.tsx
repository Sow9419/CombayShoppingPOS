import React from 'react';
import { MoreHorizontal } from 'lucide-react';

interface RecentSaleItemProps {
  sale: {
    id: string;
    productName: string;
    image?: string;
    stock: number;
    price: number;
    date: string;
    time: string;
  };
}

const RecentSaleItem: React.FC<RecentSaleItemProps> = ({ sale }) => {
  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors cursor-pointer">
      <div className="w-12 h-12 bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
        {sale.image ? (
          <img 
            src={sale.image} 
            alt={sale.productName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <span className="text-white text-xs font-bold">
              {sale.productName.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-medium text-sm truncate">{sale.productName}</h4>
        <div className="flex items-center justify-between mt-1">
          <span className="text-yellow-400 text-xs font-medium">Stock : {sale.stock}</span>
          <span className="text-white font-semibold text-sm">PV {sale.price.toFixed(0)}FCFA</span>
        </div>
        <p className="text-gray-400 text-xs mt-1">
          {sale.date} {sale.time}
        </p>
      </div>
      
      <button className="text-gray-400 hover:text-white p-1">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
};

interface RecentSalesPanelProps {
  period: string;
}

const RecentSalesPanel: React.FC<RecentSalesPanelProps> = ({ period }) => {
  const recentSales = [
    {
      id: '1',
      productName: 'Leather Wallet',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 4,
      price: 6000,
      date: '14/07/2025',
      time: '16:22'
    },
    {
      id: '2',
      productName: 'Leather Wallet',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 4,
      price: 6000,
      date: '14/07/2025',
      time: '16:22'
    },
    {
      id: '3',
      productName: 'Leather Wallet',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 4,
      price: 6000,
      date: '14/07/2025',
      time: '16:22'
    },
    {
      id: '4',
      productName: 'Leather Wallet',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400',
      stock: 4,
      price: 6000,
      date: '14/07/2025',
      time: '16:22'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h3 className="text-white font-semibold">Ventes Récentes</h3>
        <button className="text-green-400 text-sm font-medium hover:text-green-300">
          Tout
        </button>
      </div>
      
      <div className="max-h-80 overflow-y-auto no-scrollbar">
        {recentSales.map(sale => (
          <RecentSaleItem key={sale.id} sale={sale} />
        ))}
      </div>
    </div>
  );
};

export default RecentSalesPanel;