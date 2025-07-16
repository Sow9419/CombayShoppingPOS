import React, { useState } from 'react';
import { Search, Plus, ShoppingCart, Trash2, User, BarChart3 } from 'lucide-react';
import { Product, CartItem, Category } from '../types';
import { mockProducts, mockCategories } from '../data/mockData';
import CategoryBar from '../components/caisse/CategoryBar';
import ProductCard from '../components/caisse/ProductCard';
import AddProductModal from '../components/caisse/AddProductModal';
import AddCategoryModal from '../components/caisse/AddCategoryModal';

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
                         product.barcode?.includes(searchTerm);
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
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Header Mobile */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
        <div className="text-lg font-semibold">9:41</div>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
          <div className="ml-2">
            <div className="w-6 h-3 bg-white rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Products */}
        <div className="flex-1 flex flex-col">
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
          <div className="px-4 mb-4">
            <CategoryBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              onAddCategory={() => setShowAddCategory(true)}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1 px-4 pb-4 overflow-y-auto">
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

          {/* Mobile Bottom Actions */}
          <div className="md:hidden p-4 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-4 mb-4">
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
        <div className="hidden md:block w-80 bg-gray-900 border-l border-gray-800">
          <CartPanel />
        </div>
      </div>

      {/* Mobile Cart Modal */}
      {showCart && (
        <div className="md:hidden fixed inset-0 bg-black z-50">
          <CartPanel isMobile onClose={() => setShowCart(false)} />
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

  // Cart Panel Component
  function CartPanel({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Nouvelle commande</h2>
            <p className="text-sm text-gray-400">{cart.length} Produits</p>
          </div>
          {isMobile && (
            <button onClick={onClose} className="text-gray-400">
              <Trash2 size={20} />
            </button>
          )}
        </div>

        {/* Customer Section */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">CN</span>
            </div>
            <div>
              <p className="font-medium">Ajouter un client</p>
              <p className="text-sm text-gray-400">12 orders • customer@email.com</p>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="p-4 text-center text-gray-400">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Aucun article dans le panier</p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg overflow-hidden">
                    {item.product.image ? (
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-gray-400">{item.product.variant || 'Variant / Variant'}</p>
                    <p className="text-sm font-bold">{item.total.toFixed(2)} FCFA</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white">-</span>
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-800 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span>-{discount.toFixed(2)} FCFA</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>{taxes.toFixed(2)} FCFA</span>
            </div>
            <button className="w-full bg-blue-600 rounded-xl py-4 font-semibold">
              Encaisser {total.toFixed(2)}FCFA
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default CaissePage;