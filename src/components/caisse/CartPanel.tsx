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
}

/**
 * Affiche le panneau du panier.
 * Sur les écrans de bureau, il est fixé à droite.
 * Sur les écrans mobiles, il est initialement masqué et s'ouvre en modal.
 */
const CartPanel: React.FC<Props> = ({ cart, onUpdateQuantity, onRemoveFromCart, onPayment }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.2;
  const total = subtotal + tax;

  /**
   * Le contenu du panier, réutilisé pour les vues de bureau et mobile.
   */
  const cartContent = (
    <div className="flex flex-col h-full">
      {/* En-tête du panier mobile */}
      <div className="p-4 bg-gray-800 flex justify-between items-center lg:hidden">
        <h2 className="text-xl font-semibold text-white">Panier</h2>
        <button onClick={() => setIsCartOpen(false)} className="text-white">
          <X size={24} />
        </button>
      </div>

      {/* Liste des articles du panier */}
      <div className="p-4 flex-grow overflow-y-auto">
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Aucun article dans le panier</p>
        ) : (
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="p-3 bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-white text-sm">{item.product.name}</h4>
                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-500"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-500"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-green-400 font-bold">{item.total.toFixed(2)}€</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section Total et Paiement */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-gray-700 bg-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Total</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-300">
              <span>Sous-total:</span>
              <span>{subtotal.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>TVA (20%):</span>
              <span>{tax.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-white border-t border-gray-600 pt-2">
              <span>Total:</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button onClick={() => onPayment('cash')} variant="success" fullWidth>
              <Banknote size={20} /> <span className="ml-2">Payer en Espèces</span>
            </Button>
            <Button onClick={() => onPayment('card')} variant="primary" fullWidth>
              <CreditCard size={20} /> <span className="ml-2">Payer par Carte</span>
            </Button>
            <Button onClick={() => onPayment('partial')} variant="secondary" fullWidth>
              <Clock size={20} /> <span className="ml-2">Paiement Partiel</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* --- Vue Mobile --- */}
      <div className="lg:hidden">
        {/* Bouton flottant pour ouvrir le panier */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-3"
            >
              <ShoppingCart size={24} />
              <div>
                <div className="font-bold">{cart.length} article{cart.length > 1 ? 's' : ''}</div>
                <div className="text-sm">{total.toFixed(2)}€</div>
              </div>
            </button>
          </div>
        )}

        {/* Modal du panier */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-40 flex items-center justify-center">
            <div className="w-full max-w-md bg-gray-800 shadow-xl flex flex-col h-full">
              {cartContent}
            </div>
          </div>
        )}
      </div>

      {/* --- Vue Desktop --- */}
      <div className="hidden lg:block space-y-6">
        <Card className="h-full flex flex-col">
          {cartContent}
        </Card>
      </div>
    </>
  );
};

export default CartPanel;
