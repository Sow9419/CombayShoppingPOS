import React, { useState } from 'react';
import { Search, Plus, ShoppingCart, BarChart3 } from 'lucide-react';
import { Product, CartItem, Category } from '../types';
import { mockProducts, mockCategories } from '../data/mockData';
import CategoryBar from '../components/caisse/CategoryBar';
import ProductCard from '../components/caisse/ProductCard';
import AddProductModal from '../components/caisse/AddProductModal';
import AddCategoryModal from '../components/caisse/AddCategoryModal';
import CartPanel from '../components/caisse/CartPanel';

const CaissePage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showCart, setShowCart] = useState(false);

  // Filtrage des produits
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.includes(searchTerm);
    const matchesCategory = selectedCategory === null || product.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Gestion du panier
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
    // Logique de paiement à implémenter
    console.log(`Paiement par ${method}`);
    // Vider le panier après paiement
    setCart([]);
  };

  // Ajout de produit
  const handleAddProduct = (productData: any) => {
    const category = categories.find(c => c.id === productData.categoryId);
    const newProduct: Product = {
      id: Date.now().toString(),
      ...productData,
      category: category?.name || 'Autre'
    };
    setProducts([...products, newProduct]);
  };

  // Ajout de catégorie
  const handleAddCategory = (categoryData: { name: string; color: string }) => {
    const newCategory: Category = {
      id: Date.now().toString(),
      ...categoryData
    };
    setCategories([...categories, newCategory]);
  };

  // Calculs du panier
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const discount = 0;
  const taxes = subtotal * 0.2;
  const total = subtotal - discount + taxes;

  return (
    <div className="h-screen bg-black text-white flex flex-col ">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Products */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Fixed Header Section */}
          <div className="flex-shrink-0 bg-black">
            {/* Search Bar */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Category Bar */}
            <div className="px-4 pb-4">
              <CategoryBar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
                onAddCategory={() => setShowAddCategory(true)}
              />
            </div>
          </div>

          {/* Scrollable Products Grid */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 no-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={addToCart}
                />
              ))}
              
              {/* Add Product Card */}
              <div
                onClick={() => setShowAddProduct(true)}
                className="bg-gray-900 rounded-2xl p-4 h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors border-2 border-dashed border-gray-700"
              >
                <Plus size={24} className="text-gray-400 mb-2" />
                <span className="text-gray-400 text-sm text-center">Ajouter un produit</span>
              </div>
            </div>
          </div>

          {/* Mobile Bottom Actions - Fixed */}
          <div className="md:hidden flex-shrink-0 p-4 border-t border-gray-800 bg-black">
            <div className="grid grid-cols-2 gap-4 mb-4 ">
              <button className="bg-gray-900 rounded-xl p-4 flex flex-col items-center">
                <BarChart3 size={24} className="text-blue-500 mb-2" />
                <span className="text-sm">Nouvelle vente</span>
              </button>
              <button
                onClick={() => setShowAddProduct(true)}
                className="bg-gray-900 rounded-xl p-4 flex flex-col items-center"
              >
                <Plus size={24} className="text-green-500 mb-2" />
                <span className="text-sm">Ajouter un produit</span>
              </button>
            </div>
            
            {cart.length > 0 && (
              <button
                onClick={() => setShowCart(true)}
                className="w-full bg-blue-600 rounded-xl py-4 flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Panier : {cart.length} Articles - Total : {total.toFixed(2)}€</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Panel - Cart (Desktop only) */}
        <div className="hidden md:block w-96 bg-gray-900 border-l border-gray-800 flex-shrink-0">
          <CartPanel
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onPayment={handlePayment}
          />
        </div>
      </div>

      {/* Mobile Cart Modal */}
      {showCart && (
        <div className="md:hidden fixed inset-0 bg-black z-50 flex flex-col">
          <CartPanel
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            onPayment={handlePayment}
            isMobile
            onClose={() => setShowCart(false)}
          />
        </div>
      )}

      {/* Modals */}
      <AddProductModal
        isOpen={showAddProduct}
        onClose={() => setShowAddProduct(false)}
        onAddProduct={handleAddProduct}
        categories={categories}
      />

      <AddCategoryModal
        isOpen={showAddCategory}
        onClose={() => setShowAddCategory(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default CaissePage;
