import React from 'react';
import { ChevronDown } from 'lucide-react';

interface PeriodFilterProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

const PeriodFilter: React.FC<PeriodFilterProps> = ({ period, onPeriodChange }) => {
  const periods = [
    { value: 'today', label: "Aujourd'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'year', label: 'Cette année' }
  ];

  return (
    <div className="relative">
      <select
        value={period}
        onChange={(e) => onPeriodChange(e.target.value)}
        className="appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white text-sm focus:outline-none cursor-pointer"
      >
        {periods.map(p => (
          <option key={p.value} value={p.value} className="bg-white dark:bg-gray-700">
            {p.label}
          </option>
        ))}
      </select>
      <ChevronDown 
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
        size={16} 
      />
    </div>
  );
};

export default PeriodFilter;