import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Sale } from '../../types';
import SaleListItem from './SaleListItem';

interface SalesListProps {
  sales: Sale[];
  onSaleClick: (sale: Sale) => void;
  loading?: boolean;
}

const SalesList: React.FC<SalesListProps> = ({ sales, onSaleClick, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-gray-200 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-2 animate-pulse">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-2">
                <div className="h-5 bg-gray-700 rounded w-32"></div>
                <div className="h-4 bg-gray-700 rounded w-24"></div>
              </div>
              <div className="h-5 bg-gray-700 rounded w-20"></div>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="h-4 bg-gray-700 rounded w-4"></div>
              <div className="h-4 bg-gray-700 rounded w-32"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="h-6 bg-gray-700 rounded-full w-16"></div>
                <div className="h-6 bg-gray-700 rounded-full w-20"></div>
              </div>
              <div className="h-4 bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="text-gray-400" size={32} />
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">Aucune vente trouvée</h3>
        <p className="text-gray-400 max-w-md">
          Aucune transaction ne correspond aux critères de recherche actuels. 
          Essayez de modifier vos filtres ou votre terme de recherche.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {sales.map((sale) => (
        <SaleListItem
          key={sale.id}
          sale={sale}
          onClick={onSaleClick}
        />
      ))}
    </div>
  );
};

export default SalesList;
