import React from 'react';
import { Package, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import Card from '../common/Card';
import { Product } from '../../types';

interface KpiGridProps {
  products: Product[];
}

const KpiGrid: React.FC<KpiGridProps> = ({ products }) => {
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockProducts = products.filter(p => p.stock < 10);
  const averagePrice = products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0;

  const kpis = [
    {
      title: 'Total Produits',
      value: totalProducts.toString(),
      icon: Package,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Valeur du Stock',
      value: `${totalValue.toFixed(2)}€`,
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Stock Faible',
      value: lowStockProducts.length.toString(),
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10'
    },
    {
      title: 'Prix Moyen',
      value: `${averagePrice.toFixed(2)}€`,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3 pb-4">
      {kpis.map((kpi, index) => {
        const IconComponent = kpi.icon;
        return (
          <Card key={index} className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-400 text-sm font-medium">{kpi.title}</p>
                <p className="text-2xl md:text-2xl font-bold text-white mt-1">{kpi.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                <IconComponent className={kpi.color} size={24} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default KpiGrid;