import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, UserPlus, DollarSign, Smartphone, CreditCard } from 'lucide-react';
import { CartItem, Customer } from '../../types';
import { mockCustomers } from '../../data/mockData';

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

// Composant Modal pour ajouter un client
const AddCustomerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddCustomer: (customer: { name: string; email: string; phone: string }) => void;
}> = ({ isOpen, onClose, onAddCustomer }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddCustomer({ name, email, phone });
      setName('');
      setEmail('');
      setPhone('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Ajouter un client</h2>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-400 dark:hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-800 dark:text-gray-300 mb-2">Nom</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md p-2 border-2 border-gray-100 dark:border-gray-600 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-800 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md p-2 border-2 border-gray-100 dark:border-gray-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 dark:text-gray-300 mb-2">Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md p-2 border-2 border-gray-100 dark:border-gray-600 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Composant Modal pour sélectionner un client
const SelectCustomerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onAddNewCustomer: () => void;
}> = ({ isOpen, onClose, customers, onSelectCustomer, onAddNewCustomer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-w-md max-h-96 overflow-y-auto no-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Sélectionner un client</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-2">
          <button
            onClick={onAddNewCustomer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md flex items-center justify-center gap-2"
          >
            <UserPlus size={16} />
            Ajouter un nouveau client
          </button>
          {customers.map((customer) => (
            <button
              key={customer.id}
              onClick={() => onSelectCustomer(customer)}
              className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-white py-2 px-3 rounded-md text-left shadow-md"
            >
              <div className="font-medium">{customer.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-500">{customer.phone}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

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
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [isAddCustomerModalOpen, setAddCustomerModalOpen] = useState(false);
  const [isSelectCustomerModalOpen, setSelectCustomerModalOpen] = useState(false);
  const [advance, setAdvance] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const discount = 0;
  const total = subtotal - discount;
  const remaining = total - advance;

  const handleAddCustomer = (customer: { name: string; email: string; phone: string }) => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      ...customer,
      totalPurchases: 0,
    };
    setCustomers([...customers, newCustomer]);
    setSelectedCustomer(newCustomer);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="h-full flex flex-col overflow-hidden bg-gray-100 dark:bg-gray-900">
        {/* Header avec bouton de fermeture pour mobile */}
        <div className="flex-shrink-0 p-2 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Panier ({totalItems})</h2>
          {isMobile && onClose && (
            <button onClick={onClose} className="text-gray-800 dark:hover:text-gray-900 dark:text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          )}
        </div>

        {/* Customer Section */}
        <div className="flex-shrink-0 p-2 border-b border-gray-100 dark:border-gray-800">
          <div 
            className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => setSelectCustomerModalOpen(true)}
          >
            <div className="flex items-center space-x-1">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                {selectedCustomer ? (
                  <span className="text-white font-semibold text-sm">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <UserPlus size={20} className="text-white" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">{selectedCustomer ? selectedCustomer.name : 'Ajouter un client'}</p>
                {selectedCustomer && <p className="text-sm text-gray-800 dark:text-gray-400">{selectedCustomer.phone}</p>}
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Changer</button>
          </div>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {cart.length === 0 ? (
            <div className="p-4 text-center text-gray-800 dark:text-gray-400 h-full flex flex-col items-center justify-center">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Aucun article dans le panier</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.image ? (
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-xs text-gray-400">IMG</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 dark:text-white text-sm truncate">{item.product.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-700">{item.product.variant || 'Variant / Variant'}</p>
                    <p className="text-sm font-bold text-gray-700 dark:text-white">{item.total.toFixed(2)} FCFA</p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Minus size={14} className="text-gray-800 dark:text-white" />
                    </button>
                    <span className="w-8 text-center text-gray-800 dark:text-white font-medium">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Plus size={14} className="text-gray-800 dark:text-white" />
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

        {/* Summary and Payment Section */}
        {cart.length > 0 && (
          <div className={`flex-shrink-0 p-4 border-t border-gray-300 dark:border-gray-800 space-y-4 ${isMobile ? 'pb-24' : ''}`}>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-800 dark:text-gray-300">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} FCFA</span>
              </div>
              <div className="flex justify-between text-gray-800 dark:text-gray-300">
                <span>Discount</span>
                <span>-{discount.toFixed(2)} FCFA</span>
              </div>
              <div className="flex justify-between items-center text-gray-300 dark:text-gray-800">
                <span className="text-gray-800 dark:text-gray-300">Avance</span>
                <input 
                  type="number"
                  value={advance}
                  onChange={(e) => setAdvance(parseFloat(e.target.value) || 0)}
                  className="w-24 bg-gray-50 dark:bg-gray-700 text-gray-800 text-right rounded-md p-1 border border-gray-100 dark:border-gray-600 focus:outline-none"
                />
              </div>
              <div className="flex justify-between text-gray-800 dark:text-gray-300 font-bold text-lg">
                <span>Restant</span>
                <span>{remaining.toFixed(2)} FCFA</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => onPayment('cash')} 
                className="bg-white dark:bg-slate-700  text-gray-800 dark:text-white font-semibold py-2 rounded-lg flex items-center justify-center shadow-md"
              >
                <DollarSign size={16} className="mr-1"/>
                Espèce
              </button>
              <button 
                onClick={() => onPayment('card')} 
                className="bg-white dark:bg-slate-700  text-gray-800 dark:text-white font-semibold py-2 rounded-lg flex items-center justify-center shadow-md"
              >
                <Smartphone size={16} className="mr-1"/>
                Orange M.
              </button>
              <button 
                onClick={() => onPayment('partial')} 
                className="bg-white dark:bg-slate-700  text-gray-800 dark:text-white font-semibold py-2 rounded-lg flex items-center justify-center shadow-md"
              >
                <CreditCard size={16} className="mr-1"/>
                Crédit
              </button>
            </div>

            <button 
              onClick={() => onPayment('cash')}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-2 font-semibold text-white transition-colors"
            >
              Encaisser {total.toFixed(2)} FCFA
            </button>
          </div>
        )}
      </div>

      <AddCustomerModal 
        isOpen={isAddCustomerModalOpen}
        onClose={() => setAddCustomerModalOpen(false)}
        onAddCustomer={handleAddCustomer}
      />
      <SelectCustomerModal 
        isOpen={isSelectCustomerModalOpen}
        onClose={() => setSelectCustomerModalOpen(false)}
        customers={customers}
        onSelectCustomer={(customer) => {
          setSelectedCustomer(customer);
          setSelectCustomerModalOpen(false);
        }}
        onAddNewCustomer={() => {
          setSelectCustomerModalOpen(false);
          setAddCustomerModalOpen(true);
        }}
      />
    </>
  );
};

export default CartPanel;