import React, { useState, useMemo } from 'react';
import SalesStatusFilter from '../components/ventes/SalesStatusFilter';
import SearchBarAndFilters from '../components/ventes/SearchBarAndFilters';
import SalesList from '../components/ventes/SalesList';
import SaleDetailModal from '../components/ventes/SaleDetailModal';

// Mock data pour les ventes
const mockSalesData = [
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
  const [selectedSale, setSelectedSale] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Calcul des compteurs de statuts
  const statusCounts = useMemo(() => {
    return {
      all: mockSalesData.length,
      paid: mockSalesData.filter(sale => sale.paymentStatus === 'paid').length,
      partial: mockSalesData.filter(sale => sale.paymentStatus === 'partial').length,
      cancelled: mockSalesData.filter(sale => sale.paymentStatus === 'cancelled').length,
      credit: mockSalesData.filter(sale => sale.paymentStatus === 'credit').length,
    };
  }, []);

  // Filtrage des ventes
  const filteredSales = useMemo(() => {
    return mockSalesData.filter(sale => {
      // Filtre par statut
      if (activeStatus !== 'all' && sale.paymentStatus !== activeStatus) {
        return false;
      }

      // Filtre par recherche
      if (searchTerm && !sale.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !sale.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Filtre par type
      if (saleType !== 'all' && sale.type !== saleType) {
        return false;
      }

      // Filtre par date (simplifié pour la démo)
      if (dateFilter === 'today' && sale.date !== "Aujourd'hui") {
        return false;
      }

      return true;
    });
  }, [activeStatus, searchTerm, saleType, dateFilter]);

  const handleSaleClick = (sale: any) => {
    setSelectedSale(sale);
    setShowDetailModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailModal(false);
    setSelectedSale(null);
  };

  return (
    <div className="h-screen bg-black md:bg-gray-900/50 text-white flex flex-col overflow-hidden">
      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full">
        {/* Mobile Header avec filtres de statut horizontaux */}
        <div className="flex-shrink-0 p-4 border-b border-gray-800">
          <div className="flex space-x-2 overflow-x-auto pb-2 mb-4">
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
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }
                `}
              >
                <span>{status.label}</span>
                <span className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${activeStatus === status.id ? 'bg-white/20' : 'bg-gray-700'}
                `}>
                  {status.count}
                </span>
              </button>
            ))}
          </div>

          <SearchBarAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            saleType={saleType}
            onSaleTypeChange={setSaleType}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            isMobile={true}
          />
        </div>

        {/* Mobile Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          <SalesList
            sales={filteredSales}
            onSaleClick={handleSaleClick}
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        {/* Left Sidebar - Status Filters */}
        <div className="w-80 flex-shrink-0 bg-black border-r border-gray-800 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Filtres</h2>
          <SalesStatusFilter
            activeStatus={activeStatus}
            onStatusChange={setActiveStatus}
            statusCounts={statusCounts}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header avec recherche et filtres */}
          <div className="flex-shrink-0 p-6 border-b border-gray-800">
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

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            <SalesList
              sales={filteredSales}
              onSaleClick={handleSaleClick}
            />
          </div>
        </div>
      </div>

      {/* Modal de détail */}
      <SaleDetailModal
        isOpen={showDetailModal}
        onClose={handleCloseModal}
        sale={selectedSale}
      />
    </div>
  );
};

export default VentesPage;