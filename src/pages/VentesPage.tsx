
import React, { useState, useMemo } from 'react';
import SalesStatusFilter from '../components/ventes/SalesStatusFilter';
import SearchBarAndFilters from '../components/ventes/SearchBarAndFilters';
import SalesList from '../components/ventes/SalesList';
import SaleDetailModal from '../components/ventes/SaleDetailModal';
import { Sale } from '../types';

// Mock data pour les ventes
const mockSalesData: Sale[] = [
  {
    id: '1',
    orderNumber: 'ODR-3678',
    productName: 'T-shirt',
    date: "Aujourd'hui",
    time: '1:22 PM',
    amount: 6.000,
    paymentStatus: 'paid',
    transactionStatus: 'complete',
    stock: 8,
    type: 'vetement',
  },
  {
    id: '2',
    orderNumber: 'ODR-3678',
    productName: 'T-shirt',
    date: "Aujourd'hui",
    time: '1:22 PM',
    amount: 6.000,
    paymentStatus: 'partial',
    transactionStatus: 'complete',
    stock: 8,
    type: 'vetement',
  },
  {
    id: '3',
    orderNumber: 'ODR-3678',
    productName: 'T-shirt',
    date: "Aujourd'hui",
    time: '1:22 PM',
    amount: 6.000,
    paymentStatus: 'paid',
    transactionStatus: 'complete',
    stock: 8,
    type: 'vetement',
  },
  {
    id: '4',
    orderNumber: 'ODR-3678',
    productName: 'T-shirt',
    date: "Aujourd'hui",
    time: '1:22 PM',
    amount: 6.000,
    paymentStatus: 'paid',
    transactionStatus: 'complete',
    stock: 8,
    type: 'vetement',
  },
  {
    id: '5',
    orderNumber: 'ODR-3678',
    productName: 'T-shirt',
    date: "Aujourd'hui",
    time: '1:22 PM',
    amount: 6.000,
    paymentStatus: 'cancelled',
    transactionStatus: 'incomplete',
    stock: 8,
    type: 'vetement',
  },
  {
    id: '6',
    orderNumber: 'ODR-3616',
    productName: 'Chemise',
    date: '12/06/2025',
    time: '3:22 PM',
    amount: 10.000,
    paymentStatus: 'credit',
    transactionStatus: 'incomplete',
    stock: 8,
    type: 'vetement',
  },
  {
    id: '7',
    orderNumber: 'ODR-3678',
    productName: 'T-shirt',
    date: "Aujourd'hui",
    time: '1:22 PM',
    amount: 6.000,
    paymentStatus: 'paid',
    transactionStatus: 'complete',
    stock: 8,
    type: 'vetement',
  },
  {
    id: '8',
    orderNumber: 'ODR-3678',
    productName: 'T-shirt',
    date: "Aujourd'hui",
    time: '1:22 PM',
    amount: 6.000,
    paymentStatus: 'paid',
    transactionStatus: 'complete',
    stock: 8,
    type: 'vetement',
  },
];

const VentesPage: React.FC = () => {
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [saleType, setSaleType] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const statusCounts = useMemo(() => {
    return {
      all: mockSalesData.length,
      paid: mockSalesData.filter(sale => sale.paymentStatus === 'paid').length,
      partial: mockSalesData.filter(sale => sale.paymentStatus === 'partial').length,
      cancelled: mockSalesData.filter(sale => sale.paymentStatus === 'cancelled').length,
      credit: mockSalesData.filter(sale => sale.paymentStatus === 'credit').length,
    };
  }, []);

  const filteredSales = useMemo(() => {
    return mockSalesData.filter(sale => {
      if (activeStatus !== 'all' && sale.paymentStatus !== activeStatus) {
        return false;
      }

      if (searchTerm && !sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !sale.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      if (saleType !== 'all' && sale.type !== saleType) {
        return false;
      }

      if (dateFilter === 'today' && sale.date !== "Aujourd'hui") {
        return false;
      }

      return true;
    });
  }, [activeStatus, searchTerm, saleType, dateFilter]);

  const handleSaleClick = (sale: Sale) => {
    setSelectedSale(sale);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedSale(null);
  };

  return (
    <div className="h-screen bg-zinc-100 dark:bg-black  md:dark:bg-gray-900/50 text-white flex flex-col overflow-hidden">
      <div className="md:hidden flex flex-col h-full">
        <div className="flex-shrink-0 p-4 border-b  border-gray-300 dark:border-gray-800">
          <SearchBarAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            saleType={saleType}
            onSaleTypeChange={setSaleType}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            isMobile={true}
          />
          <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: 'Tous', count: statusCounts.all },
              { id: 'paid', label: 'Payé', count: statusCounts.paid },
              { id: 'partial', label: 'Partiel', count: statusCounts.partial },
              { id: 'cancelled', label: 'Annulé', count: statusCounts.cancelled },
              { id: 'credit', label: 'Crédits', count: statusCounts.credit },
            ].map((status) => (
              <button
                key={status.id}
                onClick={() => setActiveStatus(status.id)}
                className={`
                  flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeStatus === status.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white  dark:bg-gray-800 text-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }
                `}
              >
                <span>{status.label}</span>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${activeStatus === status.id ? 'bg-slate-100 text-gray-800 dark:text-white dark:bg-white/20' : 'bg-gray-200 dark:bg-gray-700'}
                `}>
                  {status.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          <SalesList
            sales={filteredSales}
            onSaleClick={handleSaleClick}
          />
        </div>
      </div>

      <div className="hidden md:flex h-full">
        <div className="w-80 flex-shrink-0 bg-white dark:bg-black p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Historique vente</h2>
          <SalesStatusFilter
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
            statusCounts={statusCounts}
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-shrink-0 p-6 border-b  border-gray-300 dark:border-gray-800">
            <SearchBarAndFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              saleType={saleType}
              onSaleTypeChange={setSaleType}
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
              isMobile={false}
            />
          </div>

          <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
            <SalesList
              sales={filteredSales}
              onSaleClick={handleSaleClick}
            />
          </div>
        </div>
      </div>

      <SaleDetailModal
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        sale={selectedSale}
      />
    </div>
  );
};

export default VentesPage;
