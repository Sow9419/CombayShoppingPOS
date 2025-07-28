import React from 'react';
import { Plus } from 'lucide-react';
import { Category } from '../../types';

interface CategoryBarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
  onAddCategory: () => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  onAddCategory,
}) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
      {/* Bouton Tous */}
      <button
        onClick={() => onCategorySelect(null)}
        className={`
          flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
          ${selectedCategory === null
            ? 'bg-blue-600 text-white dark:bg-white dark:text-black'
            : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 shadow-md'
          }
        `}
      >
        Tous
      </button>

      {/* Catégories */}
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`
            flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${selectedCategory === category.id
              ? 'bg-blue-600 text-white dark:bg-black dark:text-black shadow-md'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-white shadow-md'
            }
          `}
        >
          {category.name}
        </button>
      ))}

      {/* Bouton Ajouter catégorie */}
      <button
        onClick={onAddCategory}
        className="flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-800 hover:bg-gray-300  dark:hover:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300  transition-all duration-200 shadow-md"
        title="Ajouter une catégorie"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default CategoryBar;