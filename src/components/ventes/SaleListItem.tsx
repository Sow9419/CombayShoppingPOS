import React from 'react';
import { Clock, Package } from 'lucide-react';
import { Sale } from '../../types';
import { getPaymentStatusConfig, getTransactionStatusConfig } from '../../utils/salesUtils';

interface SaleListItemProps {
  sale: Sale;
  onClick: (sale: Sale) => void;
}

const SaleListItem: React.FC<SaleListItemProps> = ({ sale, onClick }) => {
  const paymentConfig = getPaymentStatusConfig(sale.paymentStatus);
  const transactionConfig = getTransactionStatusConfig(sale.transactionStatus);

  return (
    <div
      onClick={() => onClick(sale)}
      className=" p-4 hover:bg-gray-100 dark:hover:bg-gray-800/40 transition-all duration-200 cursor-pointer group bg-white dark:bg-gray-900 shadow-md rounded-lg py-2"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-gray-800 dark:text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
            {sale.orderNumber}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-gray-800 dark:text-white font-bold text-lg">{sale.amount.toFixed(3)} FCFA</p>
        </div>
      </div>

      <div className='flex items-center justify-between pb-2'>
        <p className="text-gray-600 dark:text-gray-300 font-medium">{sale.productName}</p>
        <div className="flex items-center space-x-2">
          <Clock size={16} className="text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {sale.date} à {sale.time}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${paymentConfig.bgColor} ${paymentConfig.textColor} ${paymentConfig.borderColor}`}>
            {paymentConfig.label}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${transactionConfig.bgColor} ${transactionConfig.textColor} ${transactionConfig.borderColor}`}>
            {transactionConfig.label}
          </span>
        </div>
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