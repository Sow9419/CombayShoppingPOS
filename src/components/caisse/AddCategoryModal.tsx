import React, { useState } from 'react';
import { X, Palette } from 'lucide-react';
import Button from '../common/Button';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCategory: (category: { name: string; color: string }) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onAddCategory,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    color: 'bg-blue-500',
  });

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Bleu', color: '#3B82F6' },
    { value: 'bg-green-500', label: 'Vert', color: '#10B981' },
    { value: 'bg-purple-500', label: 'Violet', color: '#8B5CF6' },
    { value: 'bg-orange-500', label: 'Orange', color: '#F97316' },
    { value: 'bg-red-500', label: 'Rouge', color: '#EF4444' },
    { value: 'bg-yellow-500', label: 'Jaune', color: '#EAB308' },
    { value: 'bg-pink-500', label: 'Rose', color: '#EC4899' },
    { value: 'bg-indigo-500', label: 'Indigo', color: '#6366F1' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Veuillez entrer un nom pour la catégorie');
      return;
    }

    onAddCategory({
      name: formData.name.trim(),
      color: formData.color,
    });

    // Reset form
    setFormData({
      name: '',
      color: 'bg-blue-500',
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Ajouter une catégorie</h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nom de la catégorie */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Ex: Électronique"
              required
            />
          </div>

          {/* Couleur */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              Couleur de la catégorie
            </label>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: option.value })}
                  className={`
                    relative w-full h-12 rounded-lg transition-all duration-200 
                    ${formData.color === option.value 
                      ? 'border-foreground scale-105' 
                      : 'border-border hover:border-muted-foreground'
                    }
                  `}
                  style={{ backgroundColor: option.color }}
                  title={option.label}
                >
                  {formData.color === option.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 bg-foreground rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Aperçu */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Aperçu
            </label>
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-4 h-4 rounded-full ${formData.color}`}
                ></div>
                <span className="text-card-foreground">
                  {formData.name || 'Nom de la catégorie'}
                </span>
              </div>
            </div>
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
              className="bg-primary hover:bg-primary/90"
            >
              Créer la catégorie
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;