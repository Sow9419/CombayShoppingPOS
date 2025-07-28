
import React from 'react';
import { Check, Clock, X, CreditCard, ShoppingBag } from 'lucide-react';

interface SalesStatusFilterProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
  statusCounts: {
    all: number;
    paid: number;
    partial: number;
    cancelled: number;
    credit: number;
  };
}

const SalesStatusFilter: React.FC<SalesStatusFilterProps> = ({ activeStatus, onStatusChange, statusCounts }) => {
  const statusItems = [
    {
      id: 'all',
      label: 'Tous les Ventes',
      icon: <ShoppingBag size={20} />,
      count: statusCounts.all,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      id: 'paid',
      label: 'Payé',
      icon: <Check size={20} />,
      count: statusCounts.paid,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      id: 'partial',
      label: 'Partiel',
      icon: <Clock size={20} />,
      count: statusCounts.partial,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
    },
    {
      id: 'cancelled',
      label: 'Annulé',
      icon: <X size={20} />,
      count: statusCounts.cancelled,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
    },
    {
      id: 'credit',
      label: 'Crédits',
      icon: <CreditCard size={20} />,
      count: statusCounts.credit,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <div className="space-y-2">
      {statusItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onStatusChange(item.id)}
          className={`
            w-full flex items-center justify-between p-2 rounded-xl transition-all duration-200
            ${activeStatus === item.id
              ? `${item.bgColor} ${item.borderColor} border-2 ${item.color}`
              : 'bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <div className={activeStatus === item.id ? item.color : 'text-gray-400'}>
              {item.icon}
            </div>
            <span className="font-medium">{item.label}</span>
          </div>
          <div className={`
            px-2 py-1 rounded-full text-xs font-bold min-w-[24px] text-center
            ${activeStatus === item.id
              ? `${item.color} bg-current/20`
              : 'bg-blue-500 dark:bg-gray-700 text-gray-300'
            }
          `}>
            {item.count}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SalesStatusFilter;
