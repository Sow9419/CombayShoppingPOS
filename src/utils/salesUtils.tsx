
import { PaymentStatus, TransactionStatus, } from '../types/index';
import { Check, Clock, Ban, CreditCard, Package } from 'lucide-react';

interface PaymentStatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: JSX.Element;
}

export const getPaymentStatusConfig = (status: PaymentStatus): PaymentStatusConfig => {
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
      // Log d'avertissement pour les statuts non reconnus
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Statut de paiement non reconnu: ${status}`);
      }
      return {
        label: 'Inconnu',
        bgColor: 'bg-gray-500/20',
        textColor: 'text-gray-400',
        borderColor: 'border-gray-500/30',
        icon: <Package size={16} />,
      };
  }
};

interface TransactionStatusConfig {
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export const getTransactionStatusConfig = (status: TransactionStatus): TransactionStatusConfig => {
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
      // Log d'avertissement pour les statuts non reconnus
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Statut de transaction non reconnu: ${status}`);
      }
      return {
        label: 'Inconnu',
        bgColor: 'bg-gray-500/20',
        textColor: 'text-gray-400',
        borderColor: 'border-gray-500/30',
      };
  }
};