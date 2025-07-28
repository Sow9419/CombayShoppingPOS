import React from 'react';
import { Product, Category } from '../../types';
import ProductCard from './ProductCard';

interface ProductsGridProps {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  onProductClick: (product: Product) => void;
}

const ProductsGrid: React.FC<ProductsGridProps> = ({ 
  products, 
  categories, 
  activeCategory, 
  onProductClick
}) => {
  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === categories.find(c => c.id === activeCategory)?.name);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={onProductClick}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;