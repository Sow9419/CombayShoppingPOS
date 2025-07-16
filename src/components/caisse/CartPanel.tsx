import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, CreditCard, Banknote, Clock } from 'lucide-react';
import { CartItem } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';

interface Props {
  /** Liste des articles dans le panier */
  cart: CartItem[];
  /** Fonction pour mettre à jour la quantité d'un article */
  onUpdateQuantity: (id: string, change: number) => void;
  /** Fonction pour supprimer un article du panier */
  onRemoveFromCart: (id: string) => void;
  /** Fonction pour gérer le paiement */
  onPayment: (method: 'cash' | 'card' | 'partial') => void;
  /** Mode mobile */
  isMobile?: boolean;
  /** Fonction de fermeture pour mobile */
  onClose?: () => void;
}

/**
 * Panneau de panier optimisé avec sections fixes et scrollables
 */
const CartPanel: React.FC<Props> = ({ 
  cart, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  onPayment,
  isMobile = false,
  onClose
}) => {
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.2;
  const discount = 0;
  const total = subtotal + tax - discount;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-900">
      {/* Fixed Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Nouvelle commande</h2>
            <p className="text-sm text-gray-400">{cart.length} Produits</p>
          </div>
          {isMobile && (
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          )}
        </div>
      </div>

      {/* Fixed Customer Section */}
      <div className="flex-shrink-0 p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">CN</span>
          </div>
          <div>
            <p className="font-medium text-white">Ajouter un client</p>
            <p className="text-sm text-gray-400">12 orders • customer@email.com</p>
          </div>
        </div>
      </div>

      {/* Scrollable Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {cart.length === 0 ? (
          <div className="p-4 text-center text-gray-400 h-full flex flex-col items-center justify-center">
            <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
            <p>Aucun article dans le panier</p>
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
                <div className="w-12 h-12 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  {item.product.image ? (
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-400">IMG</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white text-sm truncate">{item.product.name}</h4>
                  <p className="text-xs text-gray-400">{item.product.variant || 'Variant / Variant'}</p>
                  <p className="text-sm font-bold text-white">{item.total.toFixed(2)} FCFA</p>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <Minus size={14} className="text-white" />
                  </button>
                  <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
                  >
                    <Plus size={14} className="text-white" />
                  </button>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500 hover:text-red-400 ml-2 p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fixed Summary and Payment Section */}
      {cart.length > 0 && (
        <div className="flex-shrink-0 p-4 border-t border-gray-800 space-y-4">
          {/* Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} FCFA</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Discount</span>
              <span>-{discount.toFixed(2)} FCFA</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Taxes</span>
              <span>{tax.toFixed(2)} FCFA</span>
            </div>
          </div>
          
          {/* Payment Button */}
          <button 
            onClick={() => onPayment('cash')}
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 font-semibold text-white transition-colors"
          >
            Encaisser {total.toFixed(2)}FCFA
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPanel;