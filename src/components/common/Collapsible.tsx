
import React, { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children, isOpen = false }) => {
  const [isCollapsed, setIsCollapsed] = useState(!isOpen);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="border-b border-gray-700">
      <button
        onClick={toggleCollapse}
        className="w-full flex justify-between items-center py-3 text-left text-lg font-semibold text-gray-200"
      >
        <span>{title}</span>
        <ChevronDown
          className={`transform transition-transform duration-200 ${
            isCollapsed ? '' : 'rotate-180'
          }`}
          size={20}
        />
      </button>
      {!isCollapsed && (
        <div className="pt-2 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
