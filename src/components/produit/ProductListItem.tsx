import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../../types';
import { mockCategories } from '../../data/mockData';
import Button from '../common/Button';

interface ProductListItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product, onEdit, onDelete }) => {
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

  const handleRowClick = (e: React.MouseEvent) => {
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
      <tr 
        className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        onClick={handleRowClick}
      >
        {/* Produit */}
        <td className="px-6 py-2">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-400 text-xs">IMG</div>
              )}
            </div>
            <div>
              <div className=" text-black dark:text-white font-medium">{product.name}</div>
              {product.sku && (
                <div className="text-gray-700 dark:text-gray-400 text-sm">Code: {product.sku}</div>
              )}
              {product.variant && (
                <div className="text-gray-500 dark:text-gray-500 text-xs">{product.variant}</div>
              )}
            </div>
          </div>
        </td>

        {/* Catégorie */}
        <td className="px-6 py-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getCategoryColor(product.categoryId)}`}>
            {product.category}
          </span>
        </td>

        {/* Stock */}
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <span className="text-white font-medium">{product.stock}</span>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${stockStatus.color}`}>
              {stockStatus.label}
            </span>
          </div>
        </td>

        {/* Prix d'Achat */}
        <td className="px-6 py-4">
          <span className="text-gray-700 dark:text-gray-300">{purchasePrice.toFixed(2)}€</span>
        </td>

        {/* Prix de Vente */}
        <td className="px-6 py-4">
          <span className="text-blue-600 dark:text-green-400 font-medium">{product.price.toFixed(2)}€</span>
        </td>

        {/* Actions */}
        <td className="px-6 py-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
              className="  p-2 hover:bg-zinc-200 dark:hover:bg-blue-600 rounded-md"
            >
              <Edit size={16} className='text-gray-900 dark:text-white'/>
            </button>
            <button  
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              className="p-2 hover:bg-red-600 rounded-md"
            >
              <Trash2 size={16} className='text-gray-900 dark:text-white'/>
            </button>
          </div>
        </td>
      </tr>

      {/* Modale de confirmation de suppression */}
      {showDeleteModal && (
        <tr>
          <td colSpan={6}>
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-gray-950 dark:text-white mb-4">Confirmer la suppression</h3>
                <p className="text-gray-800 dark:text-gray-300 mb-6">
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
          </td>
        </tr>
      )}
    </>
  );
};

export default ProductListItem;