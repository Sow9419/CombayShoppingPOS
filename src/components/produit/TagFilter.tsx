import React, { useState, useMemo, useCallback } from 'react';
import { Plus, X, Tag } from 'lucide-react';
import { mockCategories } from '../../data/mockData';
import Button from '../common/Button';

interface TagFilterProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({ selectedCategories, onCategoriesChange }) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  // Mémoisation de la map des catégories pour éviter les recherches répétées
  const categoryMap = useMemo(() => {
    return mockCategories.reduce((acc, category) => {
      acc[category.id] = category;
      return acc;
    }, {} as Record<string, typeof mockCategories[0]>);
  }, []);

  // Mémoisation des catégories sélectionnées avec leurs données
  const selectedCategoryData = useMemo(() => {
    return selectedCategories
      .map(id => categoryMap[id])
      .filter(Boolean);
  }, [selectedCategories, categoryMap]);

  // Fonction unifiée pour gérer les changements de catégories
  const handleCategoryChange = useCallback((categoryId: string, shouldAdd?: boolean) => {
    const isCurrentlySelected = selectedCategories.includes(categoryId);
    const shouldToggle = shouldAdd === undefined;
    
    if (shouldToggle) {
      // Mode toggle
      if (isCurrentlySelected) {
        onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
      } else {
        onCategoriesChange([...selectedCategories, categoryId]);
      }
    } else if (shouldAdd && !isCurrentlySelected) {
      // Mode ajout explicite
      onCategoriesChange([...selectedCategories, categoryId]);
    } else if (!shouldAdd && isCurrentlySelected) {
      // Mode suppression explicite
      onCategoriesChange(selectedCategories.filter(id => id !== categoryId));
    }
  }, [selectedCategories, onCategoriesChange]);

  // Styles constants pour éviter la duplication
  const styles = {
    transition: "transition-colors",
    hoverButton: "hover:bg-black/20 rounded-full p-0.5 transition-colors",
    modalHover: "text-gray-400 hover:text-white transition-colors",
    categoryRow: "flex items-center space-x-3 cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors"
  };

  const closeModal = useCallback(() => setShowCategoryModal(false), []);

  return (
    <div className="w-full">
      {/* Bouton pour ouvrir le sélecteur de catégories */}
      <Button
        variant="secondary"
        fullWidth
        onClick={() => setShowCategoryModal(true)}
        className="flex items-center justify-between w-full text-left bg-zinc-100 dark:bg-gray-700 border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800"
      >
        <div className="flex items-center space-x-2">
          <Tag size={16} className='text-gray-800 dark:text-white'/>
          <span className='text-gray-800 dark:text-white'>Catégories</span>
        </div>
        <Plus size={16} className='text-gray-800 dark:text-white'/>
      </Button>

      {/* Tags des catégories sélectionnées */}
      {selectedCategoryData.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {selectedCategoryData.map((category) => (
            <div
              key={category.id}
              className={`flex items-center space-x-2 px-2.5 py-1 rounded-full text-xs font-medium text-white ${category.color || 'bg-gray-600'}`}
            >
              <span>{category.name}</span>
              <button
                onClick={() => handleCategoryChange(category.id, false)}
                className={styles.hoverButton}
                aria-label={`Supprimer ${category.name}`}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modale de sélection des catégories */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sélectionner les catégories</h3>
              <button
                onClick={closeModal}
                className={styles.modalHover}
                aria-label="Fermer la modale"
              >
                <X size={20} className='text-gray-900 dark:text-white'/>
              </button>
            </div>
            
            <div className="space-y-3">
              {mockCategories.map(category => (
                <label
                  key={category.id}
                  className={styles.categoryRow}
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="w-4 h-4 text-blue-600 border-gray-700 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <div className={`w-3 h-3 rounded-full ${category.color || 'bg-gray-600'}`}></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
                </label>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <Button
                onClick={closeModal}
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