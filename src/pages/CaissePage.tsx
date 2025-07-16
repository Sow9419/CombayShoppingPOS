import React, { useState } from 'react';
import { Product, CartItem } from '../types';
import { mockProducts } from '../data/mockData';
import ProductsGrid from '../components/caisse/ProductsGrid';
import CartPanel from '../components/caisse/CartPanel';

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

  const handlePayment = (method: 'cash' | 'card' | 'partial') => {
    if (cart.length === 0) return;
    
    const total = cart.reduce((sum, item) => sum + item.total, 0) * 1.2;
    alert(`Paiement ${method} de ${total.toFixed(2)}€ traité avec succès!`);
    setCart([]);
  };

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-white p-6">Caisse Enregistreuse</h1>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 overflow-hidden">
        <ProductsGrid
          products={filteredProducts}
          onProductClick={addToCart}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
        />
        <CartPanel
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          onPayment={handlePayment}
        />
      </div>
    </div>
  );
};

export default CaissePage;