import React, { useState } from 'react';
import { Search } from 'lucide-react';
import KpiGrid from '../components/dashboard/KpiGrid';
import SalesChart from '../components/dashboard/SalesChart';
import PeriodFilter from '../components/dashboard/PeriodFilter';
import BestSellersPanel from '../components/dashboard/BestSellersPanel';
import RecentSalesPanel from '../components/dashboard/RecentSalesPanel';
import MobileDashboardTabs from '../components/dashboard/MobileDashboardTabs';

const DashboardPage: React.FC = () => {
  const [period, setPeriod] = useState('today');

  return (
    <div className="h-screen bg-white dark:bg-black text-white flex flex-col overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden h-full bg-zinc-100 dark:bg-gray-900">
        <MobileDashboardTabs period={period} onPeriodChange={setPeriod} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        {/* Section Gauche - Contenu Principal (bg-black) */}
        <div className="flex-1 bg-white dark:bg-black flex flex-col overflow-hidden">
          {/* Header avec recherche */}
          <div className="flex-shrink-0 p-6 border-b border-zinc-300 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-black dark:text-white">Dashboard</h1>
                <p className="text-gray-800 dark:text-gray-400">Vue d'ensemble de vos performances</p>
              </div>
              <PeriodFilter period={period} onPeriodChange={setPeriod} />
            </div>
            
            {/* Barre de recherche */}
            <div className="relative max-w-md-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 dark:text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-3 bg-zinc-100 dark:bg-gray-800 dark:placeholder-gray-400 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Contenu scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {/* Section Today's Sales */}
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-black dark:text-white mb-1">Today's Sales</h2>
                <p className="text-gray-800 dark:text-gray-400 text-sm">Sales Summary</p>
              </div>
              <KpiGrid period={period} />
            </div>

            {/* Graphique des ventes */}
            <SalesChart period={period} />
          </div>
        </div>

        {/* Section Droite - Panneaux d'information */}
        <div className="w-80 bg-zinc-100 dark:bg-gray-900  flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar">
            <BestSellersPanel period={period} />
            <RecentSalesPanel period={period} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;