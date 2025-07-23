import React, { useState } from 'react';
import { BarChart3, TrendingUp, Package } from 'lucide-react';
import KpiGrid from './KpiGrid';
import SalesChart from './SalesChart';
import BestSellersPanel from './BestSellersPanel';
import RecentSalesPanel from './RecentSalesPanel';
import PeriodFilter from './PeriodFilter';

interface MobileDashboardTabsProps {
  period: string;
  onPeriodChange: (period: string) => void;
}

const MobileDashboardTabs: React.FC<MobileDashboardTabsProps> = ({ period, onPeriodChange }) => {
  const [activeTab, setActiveTab] = useState('stats');

  const tabs = [
    { id: 'stats', label: 'Statistiques', icon: <BarChart3 size={18} /> },
    { id: 'products', label: 'Produits', icon: <Package size={18} /> },
    { id: 'sales', label: 'Ventes', icon: <TrendingUp size={18} /> }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header avec filtre de période */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
        <PeriodFilter period={period} onPeriodChange={onPeriodChange} />
      </div>

      {/* Onglets */}
      <div className="flex border-b border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400 bg-gray-800/50'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Contenu des onglets */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {activeTab === 'stats' && (
          <>
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Today's Sales</h2>
              <p className="text-gray-400 text-sm mb-4">Sales Summary</p>
              <KpiGrid period={period} />
            </div>
            <SalesChart period={period} />
          </>
        )}
        
        {activeTab === 'products' && (
          <BestSellersPanel period={period} />
        )}
        
        {activeTab === 'sales' && (
          <RecentSalesPanel period={period} />
        )}
      </div>
    </div>
  );
};

export default MobileDashboardTabs;