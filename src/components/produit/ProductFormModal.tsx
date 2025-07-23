import React, { useState, useEffect } from 'react';
import { X, Save, Upload } from 'lucide-react';
import { Product } from '../../types';
import { mockCategories } from '../../data/mockData';
import Button from '../common/Button';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  product?: Product | null;
  mode: 'create' | 'edit';
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    stock: 0,
    categoryId: '',
    sku: '',
    image: '',
    variant: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product && mode === 'edit') {
      setFormData({
        name: product.name,
        price: product.price,
        stock: product.stock,
        categoryId: product.categoryId,
        sku: product.sku || '',
        image: product.image || '',
        variant: product.variant || ''
      });
    } else {
      setFormData({
        name: '',
        price: 0,
        stock: 0,
        categoryId: '',
        sku: '',
        image: '',
        variant: ''
      });
    }
    setErrors({});
  }, [product, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom du produit est requis';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Le prix doit être supérieur à 0';
    }

    if (formData.stock < 0) {
      newErrors.stock = 'Le stock ne peut pas être négatif';
    }

    if (!formData.categoryId) {
      newErrors.categoryId = 'La catégorie est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const category = mockCategories.find(cat => cat.id === formData.categoryId);
    
    const productData: Partial<Product> = {
      ...formData,
      category: category?.name || '',
      id: mode === 'edit' ? product?.id : undefined
    };

    onSave(productData);
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {mode === 'create' ? 'Ajouter un produit' : 'Modifier le produit'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image du produit */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image du produit
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <img 
                    src={formData.image} 
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Upload className="text-gray-400" size={24} />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="URL de l'image"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Nom du produit */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom du produit *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Entrez le nom du produit"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Catégorie *
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => handleInputChange('categoryId', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.categoryId ? 'border-red-500' : 'border-gray-600'
              }`}
            >
              <option value="">Sélectionner une catégorie</option>
              {mockCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-400 text-sm mt-1">{errors.categoryId}</p>
            )}
          </div>

          {/* Prix et Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prix de vente (€) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.price ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="text-red-400 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stock *
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.stock ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="0"
              />
              {errors.stock && (
                <p className="text-red-400 text-sm mt-1">{errors.stock}</p>
              )}
            </div>
          </div>

          {/* SKU et Variante */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Code-barres / SKU
              </label>
              <input
                type="text"
                value={formData.sku}
                onChange={(e) => handleInputChange('sku', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Code produit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Variante
              </label>
              <input
                type="text"
                value={formData.variant}
                onChange={(e) => handleInputChange('variant', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Taille, couleur, etc."
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save size={18} />
              <span>{mode === 'create' ? 'Créer' : 'Sauvegarder'}</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;