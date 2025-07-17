import React from 'react';
import { X, Printer, CreditCard, Ban, Clock, Check, Package } from 'lucide-react';
import Button from '../common/Button';

interface SaleDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  sale: any;
}

const SaleDetailModal: React.FC<SaleDetailModalProps> = ({ isOpen, onClose, sale }) => {
  if (!isOpen || !sale) return null;

  const getPaymentStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return {
          label: 'Payé',
          bgColor: 'bg-green-500/20',
          textColor: 'text-green-400',
          borderColor: 'border-green-500/30',
          icon: <Check size={16} />,
        };
      case 'partial':
        return {
          label: 'Partiel',
          bgColor: 'bg-yellow-500/20',
          textColor: 'text-yellow-400',
          borderColor: 'border-yellow-500/30',
          icon: <Clock size={16} />,
        };
      case 'cancelled':
        return {
          label: 'Annulé',
          bgColor: 'bg-red-500/20',
          textColor: 'text-red-400',
          borderColor: 'border-red-500/30',
          icon: <Ban size={16} />,
        };
      case 'credit':
        return {
          label: 'Crédits',
          bgColor: 'bg-purple-500/20',
          textColor: 'text-purple-400',
          borderColor: 'border-purple-500/30',
          icon: <CreditCard size={16} />,
        };
      default:
        return {
          label: 'Inconnu',
          bgColor: 'bg-gray-500/20',
          textColor: 'text-gray-400',
          borderColor: 'border-gray-500/30',
          icon: <Package size={16} />,
        };
    }
  };

  const paymentConfig = getPaymentStatusConfig(sale.paymentStatus);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white">{sale.orderNumber}</h2>
            <p className="text-gray-400">{sale.date} à {sale.time}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status et informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Statut de paiement</label>
                <div className={`
                  inline-flex items-center space-x-2 px-4 py-2 rounded-lg border
                  ${paymentConfig.bgColor} ${paymentConfig.textColor} ${paymentConfig.borderColor}
                `}>
                  {paymentConfig.icon}
                  <span className="font-medium">{paymentConfig.label}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Produit principal</label>
                <p className="text-white font-medium">{sale.productName}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Stock actuel</label>
                <div className="flex items-center space-x-2">
                  <Package size={16} className="text-yellow-400" />
                  <span className="text-yellow-400 font-medium">{sale.stock} unités</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Montant total</label>
                <p className="text-2xl font-bold text-white">{sale.amount.toFixed(3)} FCFA</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Statut de transaction</label>
                <span className={`
                  inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${sale.transactionStatus === 'complete' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  }
                `}>
                  {sale.transactionStatus === 'complete' ? 'Complète' : 'Incomplète'}
                </span>
              </div>
            </div>
          </div>

          {/* Détails de la commande */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">Détails de la commande</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">{sale.productName}</span>
                <span className="text-white font-medium">{sale.amount.toFixed(3)} FCFA</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-300">Quantité</span>
                <span className="text-white font-medium">1</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-300 font-semibold">Total</span>
                <span className="text-white font-bold text-lg">{sale.amount.toFixed(3)} FCFA</span>
              </div>
            </div>
          </div>

          {/* Historique des paiements */}
          <div className="bg-gray-800/50 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">Historique des paiements</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2">
                <div>
                  <span className="text-gray-300">Paiement initial</span>
                  <p className="text-sm text-gray-400">{sale.date} à {sale.time}</p>
                </div>
                <span className="text-green-400 font-medium">
                  {sale.paymentStatus === 'partial' ? (sale.amount * 0.5).toFixed(3) : sale.amount.toFixed(3)} FCFA
                </span>
              </div>
              {sale.paymentStatus === 'partial' && (
                <div className="flex justify-between items-center py-2 text-yellow-400">
                  <span>Solde restant</span>
                  <span className="font-medium">{(sale.amount * 0.5).toFixed(3)} FCFA</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-700 p-6">
          <div className="flex flex-col md:flex-row gap-3">
            {sale.paymentStatus === 'partial' && (
              <Button className="bg-green-600 hover:bg-green-700 flex items-center space-x-2">
                <CreditCard size={16} />
                <span>Encaisser le solde</span>
              </Button>
            )}
            
            <Button variant="secondary" className="flex items-center space-x-2">
              <Printer size={16} />
              <span>Imprimer le ticket</span>
            </Button>

            {sale.paymentStatus !== 'cancelled' && (
              <Button variant="danger" className="flex items-center space-x-2">
                <Ban size={16} />
                <span>Annuler la commande</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetailModal;