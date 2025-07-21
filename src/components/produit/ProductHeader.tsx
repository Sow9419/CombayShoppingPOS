import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import Button from '../common/Button';
import SortFilter from './SortFilter';
import TagFilter from './TagFilter';

interface ProductHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortOption: string;
  onSortChange: (value: string) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  onAddProduct: () => void;
}

const ProductHeader: React.FC<ProductHeaderProps> = ({
  searchTerm,
  onSearchChange,
  sortOption,
  onSortChange,
  selectedCategories,
  onCategoriesChange,
  onAddProduct
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="space-y-4">
      {/* En-tête avec titre et bouton d'ajout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Gestion des Produits</h1>
        <Button 
          onClick={onAddProduct}
          className="mt-4 md:mt-0 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={20} />
          <span>Ajouter un produit</span>
        </Button>
      </div>

      {/* Barre de contrôles et filtres */}
      <div className="bg-gray-950 rounded-lg p-4">
        {/* Desktop: Tous les filtres visibles */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          {/* Barre de recherche */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par nom ou code-barres..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtres de tri */}
          <SortFilter 
            value={sortOption}
            onChange={onSortChange}
          />

          {/* Filtres par tags */}
          <TagFilter 
            selectedCategories={selectedCategories}
            onCategoriesChange={onCategoriesChange}
          />
        </div>

        {/* Mobile: Barre de recherche proéminente + bouton filtres */}
        <div className="md:hidden space-y-4">
          {/* Barre de recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par nom ou code-barres..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Ligne avec tri et bouton filtres */}
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <SortFilter 
                value={sortOption}
                onChange={onSortChange}
              />
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center space-x-2"
            >
              <Filter size={18} />
              
            </Button>
          </div>

          {/* Bottom sheet des filtres mobiles */}
          {showMobileFilters && (
            <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <TagFilter 
                selectedCategories={selectedCategories}
                onCategoriesChange={onCategoriesChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;