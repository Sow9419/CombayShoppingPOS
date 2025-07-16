import React from 'react';
import { Product } from '../../types';
import Card from '../common/Card';

interface Props {
  /** Liste des produits à afficher */
  products: Product[];
  /** Fonction appelée lorsqu'un produit est cliqué */
  onProductClick: (product: Product) => void;
  /** Terme de recherche actuel */
  searchTerm: string;
  /** Fonction appelée lorsque le terme de recherche change */
  onSearchTermChange: (term: string) => void;
}

/**
 * Affiche une grille de produits avec une barre de recherche.
 * La grille de produits est défilable.
 */
const ProductsGrid: React.FC<Props> = ({
  products,
  onProductClick,
  searchTerm,
  onSearchTermChange,
}) => {
  return (
    <div className="lg:col-span-2 flex flex-col h-full">
      {/* Barre de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un produit ou scanner un code..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="w-full md:w-80 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Grille de produits */}
      <Card className="flex-grow overflow-y-auto">
        <h2 className="text-xl font-semibold text-white mb-4">Produits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
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
  );
};

export default ProductsGrid;
