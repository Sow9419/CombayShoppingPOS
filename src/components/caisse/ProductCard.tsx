import React from 'react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="relative bg-gray-900 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group h-32"
    >
      {/* Image de fond ou couleur de fond */}
      {product.image ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-200"
          style={{ backgroundImage: `url(${product.image})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
      )}

      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Contenu */}
      <div className="relative z-10 p-3 h-full flex flex-col justify-between">
        {/* Header avec code et stock */}
        <div className="flex justify-between items-start">
          <span className="bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-white font-medium">
            {product.barcode}
          </span>
          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-xs text-white">Stock : {product.stock}</span>
            <div className="w-2 h-2 bg-green-400 rounded-full" />
          </div>
        </div>

        {/* Footer avec nom et prix */}
        <div>
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-white/80 text-xs">
              {product.variant && `${product.variant}`}
            </span>
            <span className="text-white font-bold text-lg">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;