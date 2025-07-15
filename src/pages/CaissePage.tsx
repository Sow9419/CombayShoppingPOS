import React, { useState } from 'react';
import { Plus, Minus, Trash2, CreditCard, Banknote, Clock } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Product, CartItem } from '../types';
import { mockProducts } from '../data/mockData';

const CaissePage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode?.includes(searchTerm)
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * product.price }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        product,
        quantity: 1,
        total: product.price
      }]);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity, total: newQuantity * item.product.price };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.2;
  const total = subtotal + tax;

  const handlePayment = (method: 'cash' | 'card' | 'partial') => {
    if (cart.length === 0) return;
    
    // Simuler le traitement du paiement
    alert(`Paiement ${method === 'cash' ? 'espèces' : method === 'card' ? 'carte' : 'partiel'} de ${total.toFixed(2)}€ traité avec succès!`);
    setCart([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Caisse Enregistreuse</h1>
        <div className="mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Rechercher un produit ou scanner un code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Products Grid */}
        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-semibold text-white mb-4">Produits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map(product => (
                <div
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors"
                >
                  <h3 className="font-medium text-white">{product.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{product.category}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-lg font-bold text-green-400">{product.price.toFixed(2)}€</span>
                    <span className="text-sm text-gray-400">Stock: {product.stock}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Cart */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-white mb-4">Panier</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Aucun article dans le panier</p>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="p-3 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white text-sm">{item.product.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-500"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
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
          </Card>

          {cart.length > 0 && (
            <Card>
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
                <Button
                  onClick={() => handlePayment('cash')}
                  variant="success"
                  fullWidth
                  className="flex items-center justify-center space-x-2"
                >
                  <Banknote size={20} />
                  <span>Payer en Espèces</span>
                </Button>
                <Button
                  onClick={() => handlePayment('card')}
                  variant="primary"
                  fullWidth
                  className="flex items-center justify-center space-x-2"
                >
                  <CreditCard size={20} />
                  <span>Payer par Carte</span>
                </Button>
                <Button
                  onClick={() => handlePayment('partial')}
                  variant="secondary"
                  fullWidth
                  className="flex items-center justify-center space-x-2"
                >
                  <Clock size={20} />
                  <span>Paiement Partiel</span>
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaissePage;