import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Product } from '../../types';
import { mockCategories } from '../../data/mockData';

interface LowStockAlertProps {
  products: Product[];
}

const LowStockAlert: React.FC<LowStockAlertProps> = ({ products }) => {
  const lowStockProducts = products.filter(p => p.stock < 10);

  if (lowStockProducts.length === 0) {
    return null;
  }

  const getCategoryColor = (categoryId: string) => {
    const category = mockCategories.find(cat => cat.id === categoryId);
    return category?.color || 'bg-gray-500';
  };

  return (
    <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4 md:p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-red-500/20 rounded-lg">
          <AlertTriangle className="text-red-600" size={24} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-black dark:text-white">Alertes Stock Faible</h2>
          <p className="text-gray-600 dark:text-red-300 text-sm">
            {lowStockProducts.length} produit{lowStockProducts.length > 1 ? 's' : ''} en stock faible
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lowStockProducts.map(product => (
          <div key={product.id} className="bg-red-900/30 border border-red-600 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-black dark:text-white">{product.name}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white mt-1 ${getCategoryColor(product.categoryId)}`}>
                  {product.category}
                </span>
              </div>
              {product.imageUrl && (
                <div className="w-10 h-10 bg-gray-600 rounded-lg overflow-hidden ml-3">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 dark:text-red-400 font-bold text-lg">Stock: {product.stock}</p>
                <p className="text-gray-950 dark:text-gray-300 text-sm">{product.price.toFixed(2)}FCFA</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-black dark:text-gray-400">Valeur restante</p>
                <p className="text-black dark:text-white font-medium">{(product.price * product.stock).toFixed(2)}FCFA</p>
              </div>
            </div>
            
            {product.sku && (
              <p className="text-gray-700 dark:text-gray-300 text-xs mt-2">Code: {product.sku}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;