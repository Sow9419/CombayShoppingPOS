import React, { useState } from 'react';
import { Eye, CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { mockSales, mockCustomers } from '../data/mockData';

const VentesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');

  const filteredSales = mockSales.filter(sale => {
    const customer = mockCustomers.find(c => c.id === sale.customerId);
    const matchesSearch = customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sale.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-400" size={20} />;
      case 'pending': return <Clock className="text-yellow-400" size={20} />;
      case 'cancelled': return <XCircle className="text-red-400" size={20} />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminée';
      case 'pending': return 'En attente';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const totalRevenue = mockSales
    .filter(sale => sale.status === 'completed')
    .reduce((sum, sale) => sum + sale.total, 0);

  const pendingSales = mockSales.filter(sale => sale.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Gestion des Ventes</h1>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Chiffre d'affaires</p>
              <p className="text-2xl font-bold text-green-400">{totalRevenue.toFixed(2)}€</p>
            </div>
            <CheckCircle className="text-green-400" size={32} />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Ventes totales</p>
              <p className="text-2xl font-bold text-white">{mockSales.length}</p>
            </div>
            <Eye className="text-blue-400" size={32} />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">En attente</p>
              <p className="text-2xl font-bold text-yellow-400">{pendingSales}</p>
            </div>
            <Clock className="text-yellow-400" size={32} />
          </div>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher par client ou ID de vente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="completed">Terminées</option>
            <option value="pending">En attente</option>
            <option value="cancelled">Annulées</option>
          </select>
        </div>
      </Card>

      {/* Liste des ventes */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">Historique des Ventes</h2>
        <div className="space-y-4">
          {filteredSales.map(sale => {
            const customer = mockCustomers.find(c => c.id === sale.customerId);
            return (
              <div key={sale.id} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(sale.status)}
                      <span className="font-medium text-white">Vente #{sale.id}</span>
                      <span className="text-sm text-gray-400">
                        {new Date(sale.date).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <p className="text-gray-300">
                      Client: {customer?.name || 'Client anonyme'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {sale.items.length} article(s) - {getStatusText(sale.status)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-400">{sale.total.toFixed(2)}€</p>
                      <p className="text-sm text-gray-400 capitalize">{sale.paymentMethod}</p>
                    </div>
                    
                    <Button size="sm" variant="secondary">
                      <Eye size={16} />
                    </Button>
                  </div>
                </div>
                
                {sale.status === 'pending' && (
                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" variant="success">Marquer comme payé</Button>
                    <Button size="sm" variant="danger">Annuler</Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default VentesPage;