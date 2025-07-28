import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SortFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: 'created_desc', label: 'Créé (le plus récent en premier)' },
  { value: 'created_asc', label: 'Créé (le plus ancien en premier)' },
  { value: 'name_asc', label: 'Nom (A-Z)' },
  { value: 'name_desc', label: 'Nom (Z-A)' },
  { value: 'stock_desc', label: 'Stock (plus élevé en premier)' },
  { value: 'stock_asc', label: 'Stock (plus faible en premier)' },
  { value: 'price_desc', label: 'Prix (plus élevé en premier)' },
  { value: 'price_asc', label: 'Prix (plus faible en premier)' }
];

const SortFilter: React.FC<SortFilterProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full bg-zinc-100 dark:bg-gray-700 rounded-lg px-4 py-3 pr-10 text-gray-800 dark:text-white border border-gray-100 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 cursor-pointer min-w-[200px] focus:outline-none"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value} className="bg-zinc-100 dark:bg-gray-700">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown 
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 dark:text-gray-400 pointer-events-none" 
        size={20} 
      />
    </div>
  );
};

export default SortFilter;