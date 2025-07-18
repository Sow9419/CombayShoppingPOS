import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Category } from '../../types';
import Button from '../common/Button';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    price: number;
    stock: number;
    categoryId: string;
    sku: string;
    image?: string;
    variant?: string;
  }) => void;
  categories: Category[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  categories,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    categoryId: '',
    sku: '',
    image: '',
    variant: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.stock || !formData.categoryId) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    onAddProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      categoryId: formData.categoryId,
      sku: formData.sku || `PRD-${Date.now()}`,
      image: formData.image || undefined,
      variant: formData.variant || undefined,
    });

    // Reset form
    setFormData({
      name: '',
      price: '',
      stock: '',
      categoryId: '',
      sku: '',
      image: '',
      variant: '',
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Ajouter un produit</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nom du produit */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom du produit *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Fleece Joggers"
              required
            />
          </div>

          {/* Prix */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Prix *
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="79.99"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Stock *
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10"
              required
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Catégorie *
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Code-barres */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Code-barres
            </label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="CH-885"
            />
          </div>

          {/* Variante */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Variante
            </label>
            <input
              type="text"
              value={formData.variant}
              onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Taille, Couleur, etc."
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL de l'image
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-400 mt-1">
              Optionnel - Laissez vide pour un fond par défaut
            </p>
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              fullWidth
            >
              Annuler
            </Button>
            <Button
              type="submit"
              fullWidth
              className="bg-blue-600 hover:bg-blue-700"
            >
              Ajouter
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;