
import React from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface SearchBarAndFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  saleType: string;
  onSaleTypeChange: (type: string) => void;
  dateFilter: string;
  onDateFilterChange: (date: string) => void;
  isMobile?: boolean;
}

const SearchBarAndFilters: React.FC<SearchBarAndFiltersProps> = ({ searchTerm, onSearchChange, saleType, onSaleTypeChange, dateFilter, onDateFilterChange, isMobile = false }) => {
  const saleTypes = [
    { value: 'all', label: 'Tous les types' },
    { value: 'vetement', label: 'Vêtement' },
    { value: 'chaussure', label: 'Chaussure' },
    { value: 'accessoire', label: 'Accessoire' },
  ];

  const dateFilters = [
    { value: 'today', label: "Aujourd'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'all', label: 'Toutes les dates' },
  ];

  if (isMobile) {
    return (
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bbg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
          <select
            value={saleType}
            onChange={(e) => onSaleTypeChange(e.target.value)}
            className="flex-shrink-0 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          >
            {saleTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="flex-shrink-0 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          >
            {dateFilters.map((date) => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none "
        />
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative">
          <select
            value={saleType}
            onChange={(e) => onSaleTypeChange(e.target.value)}
            className="appearance-none px-4 py-3 pr-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          >
            {saleTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>

        <div className="relative">
          <select
            value={dateFilter}
            onChange={(e) => onDateFilterChange(e.target.value)}
            className="appearance-none px-4 py-3 pr-8 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          >
            {dateFilters.map((date) => (
              <option key={date.value} value={date.value}>
                {date.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
        </div>
      </div>
    </div>
  );
};

export default SearchBarAndFilters;
