
import React from 'react';
import { Users, Building2 } from 'lucide-react';
import AddContactButton from './AddContactButton';

interface ContactFilterSidebarProps {
  activeType: 'clients' | 'suppliers';
  onTypeChange: (type: 'clients' | 'suppliers') => void;
  onAddContact: () => void;
}

const ContactFilterSidebar: React.FC<ContactFilterSidebarProps> = ({ activeType, onTypeChange, onAddContact }) => {
  const linkClasses = " text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 flex items-center space-x-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 text-lg";
  const activeClasses = "bg-blue-700/80 dark:bg-blue-800 text-white dark:text-white";
  const inactiveClasses = "hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white";

  return (
    <div className="flex flex-col h-full">
      {/* Section des filtres */}
      <nav className="space-y-3">
        <button
          onClick={() => onTypeChange('clients')}
          className={`${linkClasses} ${activeType === 'clients' ? activeClasses : inactiveClasses}`}
        >
          <Users size={18} />
          <span>Liste des clients</span>
        </button>
        <button
          onClick={() => onTypeChange('suppliers')}
          className={`${linkClasses} ${activeType === 'suppliers' ? activeClasses : inactiveClasses}`}
        >
          <Building2 size={18} />
          <span>Liste des fournisseurs</span>
        </button>
        {/* Bouton d'ajout poussé en bas */}
        <AddContactButton onClick={onAddContact} contactType={activeType} />
      </nav>
    </div>
  );
};

export default ContactFilterSidebar;
