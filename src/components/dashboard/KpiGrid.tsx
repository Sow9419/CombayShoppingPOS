import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, CreditCard } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  iconColor: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, changeType, icon, iconColor }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg ${iconColor}`}>
          {icon}
        </div>
        <div className={`flex items-center space-x-1 text-xs ${
          changeType === 'increase' ? 'text-green-400' : 'text-red-400'
        }`}>
          {changeType === 'increase' ? (
            <TrendingUp size={14} />
          ) : (
            <TrendingDown size={14} />
          )}
          <span>{change}</span>
        </div>
      </div>
      
      <div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-gray-400 text-xs">{title}</p>
      </div>
    </div>
  );
};

interface KpiGridProps {
  period: string;
}

const KpiGrid: React.FC<KpiGridProps> = ({ period }) => {
  // Données simulées basées sur la période
  const kpis = [
    {
      title: 'Total de vente',
      value: '764.000FCFA',
      change: '+10%',
      changeType: 'increase' as const,
      icon: <DollarSign size={20} className="text-orange-400" />,
      iconColor: 'bg-orange-500/20'
    },
    {
      title: 'Dépenses',
      value: '400.000FCFA',
      change: '+5%',
      changeType: 'increase' as const,
      icon: <CreditCard size={20} className="text-blue-400" />,
      iconColor: 'bg-blue-500/20'
    },
    {
      title: 'Nombre de vente',
      value: '9',
      change: '+2%',
      changeType: 'increase' as const,
      icon: <ShoppingBag size={20} className="text-purple-400" />,
      iconColor: 'bg-purple-500/20'
    },
    {
      title: 'Nombre client',
      value: '12',
      change: '+3%',
      changeType: 'increase' as const,
      icon: <Users size={20} className="text-cyan-400" />,
      iconColor: 'bg-cyan-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {kpis.map((kpi, index) => (
        <KpiCard key={index} {...kpi} />
      ))}
    </div>
  );
};

export default KpiGrid;