import React from 'react';
import { Product } from '../../types';
import ProductListItem from './ProductListItem';
import ProductDetailCard from './ProductDetailCard';

interface ProductListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEditProduct, onDeleteProduct }) => {
  if (products.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <div className="text-gray-400 text-lg">Aucun produit trouvé</div>
        <div className="text-gray-500 text-sm mt-2">Essayez de modifier vos filtres de recherche</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
      {/* Affichage Desktop - Tableau */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-200 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                  Produit
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                  P.A
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                  P.V
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-black dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
              {products.map(product => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  onEdit={onEditProduct}
                  onDelete={onDeleteProduct}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Affichage Mobile/Tablet - Cartes */}
      <div className="lg:hidden p-4 space-y-4 bg-zinc-100 dark:bg-black">
        {products.map(product => (
          <ProductDetailCard
            key={product.id}
            product={product}
            onEdit={onEditProduct}
            onDelete={onDeleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;