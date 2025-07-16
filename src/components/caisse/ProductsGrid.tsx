import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Product, Category } from '../../types';
import ProductCard from './ProductCard';
import CategoryBar from './CategoryBar';

interface Props {
  /** Liste des produits à afficher */
  products: Product[];
  /** Liste des catégories */
  categories: Category[];
  /** Catégorie sélectionnée */
  selectedCategory: string | null;
  /** Fonction appelée lorsqu'un produit est cliqué */
  onProductClick: (product: Product) => void;
  /** Terme de recherche actuel */
  searchTerm: string;
  /** Fonction appelée lorsque le terme de recherche change */
  onSearchTermChange: (term: string) => void;
  /** Fonction appelée pour sélectionner une catégorie */
  onCategorySelect: (categoryId: string | null) => void;
  /** Fonction pour ajouter un produit */
  onAddProduct: () => void;
  /** Fonction pour ajouter une catégorie */
  onAddCategory: () => void;
}

/**
 * Grille de produits optimisée avec header fixe et contenu scrollable
 */
const ProductsGrid: React.FC<Props> = ({
  products,
  categories,
  selectedCategory,
  onProductClick,
  searchTerm,
  onSearchTermChange,
  onCategorySelect,
  onAddProduct,
  onAddCategory,
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden">
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
              onChange={(e) => onSearchTermChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Bar */}
        <div className="px-4 pb-4">
          <CategoryBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={onCategorySelect}
            onAddCategory={onAddCategory}
          />
        </div>
      </div>

      {/* Scrollable Products Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
            />
          ))}
          
          {/* Add Product Card */}
          <div
            onClick={onAddProduct}
            className="bg-gray-900 rounded-2xl p-4 h-32 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors border-2 border-dashed border-gray-700"
          >
            <Plus size={24} className="text-gray-400 mb-2" />
            <span className="text-gray-400 text-sm text-center">Ajouter un produit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;