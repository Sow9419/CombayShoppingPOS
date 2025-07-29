import React from 'react';
import { Users, Building2, Plus } from 'lucide-react';

interface MobileContactFiltersProps {
  activeType: 'clients' | 'suppliers';
  onTypeChange: (type: 'clients' | 'suppliers') => void;
  onAddContact: () => void;
}

const MobileContactFilters: React.FC<MobileContactFiltersProps> = ({ activeType, onTypeChange, onAddContact }) => {
  const baseClasses = "flex-1 flex items-center justify-center px-3 py-3 text-sm font-medium transition-colors duration-200 rounded-md text-gray-900 dark:text-white";
  const activeClasses = "bg-blue-600 hover:bg-blue-700 dark:bg-gray-700 text-white";
  const inactiveClasses = "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white";

  return (
    // Le conteneur est maintenant un simple div flex, visible uniquement sur mobile
    <div className="md:hidden flex items-center gap-2 pt-2 pb-4">
      {/* Groupe de filtres */}
      <div className="flex-1 flex items-center gap-0 p-1 bg-white dark:bg-gray-800 rounded-lg">
        <button 
          onClick={() => onTypeChange('clients')}
          className={`${baseClasses} ${activeType === 'clients' ? activeClasses : inactiveClasses}`}
        >
          <Users size={18} className="mr-1.5" />
          Clients
        </button>
        <button 
          onClick={() => onTypeChange('suppliers')}
          className={`${baseClasses} ${activeType === 'suppliers' ? activeClasses : inactiveClasses}`}
        >
          <Building2 size={18} className="mr-1.5" />
          Fournisseurs
        </button>
      </div>

      {/* Bouton d'ajout séparé */}
      <button 
        onClick={onAddContact}
        className="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 shadow-lg"
        aria-label="Ajouter un contact"
      >
        <Plus size={20} />
      </button>
    </div>
  );
};

export default MobileContactFilters;