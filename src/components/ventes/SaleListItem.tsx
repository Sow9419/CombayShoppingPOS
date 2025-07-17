import React from 'react';
import { Clock, Package } from 'lucide-react';

interface SaleListItemProps {
  sale: {
    id: string;
    orderNumber: string;
    productName: string;
    date: string;
    time: string;
    amount: number;
    paymentStatus: 'paid' | 'partial' | 'cancelled' | 'credit';
    transactionStatus: 'complete' | 'incomplete';
    stock: number;
  };
  onClick: (sale: any) => void;
}

const SaleListItem: React.FC<SaleListItemProps> = ({ sale, onClick }) => {
  const getPaymentStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          label: 'Payé',
          bgColor: 'bg-green-500/20',
          textColor: 'text-green-400',
          borderColor: 'border-green-500/30',
        };
      case 'partial':
        return {
          label: 'Partiel',
          bgColor: 'bg-yellow-500/20',
          textColor: 'text-yellow-400',
          borderColor: 'border-yellow-500/30',
        };
      case 'cancelled':
        return {
          label: 'Annulé',
          bgColor: 'bg-red-500/20',
          textColor: 'text-red-400',
          borderColor: 'border-red-500/30',
        };
      case 'credit':
        return {
          label: 'Crédits',
          bgColor: 'bg-purple-500/20',
          textColor: 'text-purple-400',
          borderColor: 'border-purple-500/30',
        };
      default:
        return {
          label: 'Inconnu',
          bgColor: 'bg-gray-500/20',
          textColor: 'text-gray-400',
          borderColor: 'border-gray-500/30',
        };
    }
  };

  const getTransactionStatusConfig = (status: string) => {
    switch (status) {
      case 'complete':
        return {
          label: 'Complète',
          bgColor: 'bg-blue-500/20',
          textColor: 'text-blue-400',
          borderColor: 'border-blue-500/30',
        };
      case 'incomplete':
        return {
          label: 'Incomplète',
          bgColor: 'bg-orange-500/20',
          textColor: 'text-orange-400',
          borderColor: 'border-orange-500/30',
        };
      default:
        return {
          label: 'Inconnu',
          bgColor: 'bg-gray-500/20',
          textColor: 'text-gray-400',
          borderColor: 'border-gray-500/30',
        };
    }
  };

  const paymentConfig = getPaymentStatusConfig(sale.paymentStatus);
  const transactionConfig = getTransactionStatusConfig(sale.transactionStatus);

  return (
    <div
      onClick={() => onClick(sale)}
      className=" border-b border-gray-700  p-2 hover:bg-gray-800/40  transition-all duration-200 cursor-pointer group"
    >
      {/* Header avec ID et montant */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
            {sale.orderNumber}
          </h3>
        </div>
        <div className="text-right ">
          <p className="text-white font-bold text-lg">{sale.amount.toFixed(3)}FCFA</p>
        </div>
      </div>

      
      <div className='flex items-center justify-between pb-1'>
        <p className="text-gray-300 font-medium">{sale.productName}</p>
        {/* Date et heure */}
        <div className="flex items-center space-x-2">
        <Clock size={16} className="text-gray-400" />
        <span className="text-gray-400 text-sm">
          {sale.date} à {sale.time}
        </span>
      </div>
      </div>

      {/* Status badges et stock */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Payment Status */}
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium border
            ${paymentConfig.bgColor} ${paymentConfig.textColor} ${paymentConfig.borderColor}
          `}>
            {paymentConfig.label}
          </span>

          {/* Transaction Status */}
          <span className={`
            px-3 py-1 rounded-full text-xs font-medium border
            ${transactionConfig.bgColor} ${transactionConfig.textColor} ${transactionConfig.borderColor}
          `}>
            {transactionConfig.label}
          </span>
        </div>

        {/* Stock */}
        <div className="flex items-center space-x-1">
          <Package size={14} className="text-yellow-400" />
          <span className="text-yellow-400 text-sm font-medium">
            Stock : {sale.stock}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaleListItem;