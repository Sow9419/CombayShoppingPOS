import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { mockCategories } from '../../data/mockData';
import Button from '../common/Button';

interface ProductDetailCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product, onEdit, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'En rupture', color: 'bg-red-500' };
    if (stock < 10) return { label: 'Faible', color: 'bg-orange-500' };
    return { label: 'Suffisant', color: 'bg-green-500' };
  };

  const getCategoryColor = (categoryId: string) => {
    const category = mockCategories.find(cat => cat.id === categoryId);
    return category?.color || 'bg-gray-500';
  };

  const stockStatus = getStockStatus(product.stock);
  const purchasePrice = product.price * 0.6; // Prix d'achat simulé (60% du prix de vente)

  const handleCardClick = (e: React.MouseEvent) => {
    // Ne pas déclencher l'édition si on clique sur les boutons d'action
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onEdit(product);
  };

  const handleDelete = () => {
    onDelete(product);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div 
        className="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
        onClick={handleCardClick}
      >
        {/* En-tête avec image et actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-sm">IMG</div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium text-lg">{product.name}</h3>
              {product.sku && (
                <p className="text-gray-400 text-sm">Code: {product.sku}</p>
              )}
              {product.variant && (
                <p className="text-gray-500 text-xs">{product.variant}</p>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              className="p-2 hover:bg-blue-600"
            >
              <Edit size={16} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              className="p-2 hover:bg-red-600"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        {/* Catégorie */}
        <div className="mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(product.categoryId)}`}>
            {product.category}
          </span>
        </div>

        {/* Informations de stock */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-400 text-sm">Stock</p>
            <div className="flex items-center space-x-2">
              <span className="text-white font-bold text-lg">{product.stock}</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${stockStatus.color}`}>
                {stockStatus.label}
              </span>
            </div>
          </div>
        </div>

        {/* Prix */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-400 text-sm">P.A (Prix d'Achat)</p>
            <p className="text-gray-300 font-medium text-lg">{purchasePrice.toFixed(2)}€</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">P.V (Prix de Vente)</p>
            <p className="text-green-400 font-bold text-lg">{product.price.toFixed(2)}€</p>
          </div>
        </div>

        {/* Valeur totale */}
        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">Valeur totale en stock</span>
            <span className="text-white font-medium">{(product.price * product.stock).toFixed(2)}€</span>
          </div>
        </div>
      </div>

      {/* Modale de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">Confirmer la suppression</h3>
            <p className="text-gray-300 mb-6">
              Êtes-vous sûr de vouloir supprimer le produit "{product.name}" ?
              Cette action est irréversible.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailCard;