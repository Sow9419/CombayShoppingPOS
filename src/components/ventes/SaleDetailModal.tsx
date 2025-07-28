import React from 'react';
import { X, Printer, CreditCard, Ban, Package } from 'lucide-react';
import { Sale } from '../../types';
import { getPaymentStatusConfig, getTransactionStatusConfig } from '../../utils/salesUtils';
import Button from '../common/Button';

interface SaleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: Sale | null;
}

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({ isOpen, onClose, sale }) => {
  if (!isOpen || !sale) return null;

  const paymentConfig = getPaymentStatusConfig(sale.paymentStatus);
  const transactionConfig = getTransactionStatusConfig(sale.transactionStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-300 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-black/80 dark:text-white">{sale.orderNumber}</h2>
            <p className="text-gray-600 dark:text-gray-400">{sale.date} à {sale.time}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">Statut de paiement</label>
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg border ${paymentConfig.bgColor} ${paymentConfig.textColor} ${paymentConfig.borderColor}`}>
                  {paymentConfig.icon}
                  <span className="font-medium">{paymentConfig.label}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">Produit principal</label>
                <p className="text-black/80 dark:text-white font-medium">{sale.productName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">Stock actuel</label>
                <div className="flex items-center space-x-2">
                  <Package size={16} className="text-yellow-400" />
                  <span className="text-yellow-400 font-medium">{sale.stock} unités</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">Montant total</label>
                <p className="text-2xl font-bold text-black/80 dark:text-white">{sale.amount.toFixed(3)} FCFA</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">Statut de transaction</label>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${transactionConfig.bgColor} ${transactionConfig.textColor} ${transactionConfig.borderColor}`}>
                  {transactionConfig.label}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 dark:bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Détails de la commande</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b  border-black/30 dark:border-gray-700">
                <span className="text-gray-900 dark:text-gray-300">{sale.productName}</span>
                <span className="text-black/80 dark:text-white font-medium">{sale.amount.toFixed(3)} FCFA</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-black/30 dark:border-gray-700">
                <span className="text-gray-900 dark:text-gray-300">Quantité</span>
                <span className="text-black/80 dark:text-white font-medium">1</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-900 dark:text-gray-300 font-semibold">Total</span>
                <span className="text-black/80 dark:text-white font-bold text-lg">{sale.amount.toFixed(3)} FCFA</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 dark:bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Historique des paiements</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2">
                <div>
                  <span className="text-gray-900 dark:text-gray-300">Paiement initial</span>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{sale.date} à {sale.time}</p>
                </div>
                <span className="text-blue-700 font-medium">
                  {sale.paymentStatus === 'partial' ? (sale.amount * 0.5).toFixed(3) : sale.amount.toFixed(3)} FCFA
                </span>
              </div>
              {sale.paymentStatus === 'partial' && (
                <div className="flex justify-between items-center py-2 text-blue-700 dark:text-yellow-400">
                  <span>Solde restant</span>
                  <span className="font-medium">{(sale.amount * 0.5).toFixed(3)} FCFA</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row gap-3">
            {sale.paymentStatus === 'partial' && (
              <Button className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
                <CreditCard size={16} />
                <span>Encaisser le solde</span>
              </Button>
            )}
            
            <button className="flex items-center space-x-2 bg-blue-600 p-2 rounded-md">
              <Printer size={16} />
              <span>Imprimer le ticket</span>
            </button>

            {sale.paymentStatus !== 'cancelled' && (
              <button className="flex items-center space-x-2 bg-red-700 p-2 rounded-md">
                <Ban size={16} />
                <span>Annuler la commande</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailModal;