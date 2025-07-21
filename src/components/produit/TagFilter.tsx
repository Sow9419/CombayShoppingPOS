import React, { useState } from 'react';
import { Plus, X, Tag } from 'lucide-react';
import { mockCategories } from '../../data/mockData';
import Button from '../common/Button';

interface TagFilterProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ selectedCategories, onCategoriesChange }) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoriesChange([...selectedCategories, categoryId]);
    }
  };

  const removeCategory = (categoryId: string) => {
    onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
  };

  const getSelectedCategoryNames = () => {
    return selectedCategories.map(id => {
      const category = mockCategories.find(cat => cat.id === id);
      return category ? category.name : '';
    }).filter(Boolean);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Bouton pour ouvrir le sélecteur de catégories */}
      <Button
        variant="secondary"
        onClick={() => setShowCategoryModal(true)}
        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 border border-gray-600"
      >
        <Tag size={16} />
        <span>Catégorie</span>
        <Plus size={16} />
      </Button>

      {/* Tags des catégories sélectionnées */}
      {getSelectedCategoryNames().map((categoryName, index) => {
        const categoryId = selectedCategories[index];
        const category = mockCategories.find(cat => cat.id === categoryId);
        return (
          <div
            key={categoryId}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium text-white ${category?.color || 'bg-gray-600'}`}
          >
            <span>{categoryName}</span>
            <button
              onClick={() => removeCategory(categoryId)}
              className="hover:bg-black/20 rounded-full p-1 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}

      {/* Modale de sélection des catégories */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Sélectionner les catégories</h3>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              {mockCategories.map(category => (
                <label
                  key={category.id}
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                    className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                  <span className="text-white">{category.name}</span>
                </label>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <Button
                onClick={() => setShowCategoryModal(false)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Appliquer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter;