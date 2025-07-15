import React, { useState } from 'react';
import { Plus, Search, Edit, Mail, Phone, MapPin, User } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { mockCustomers } from '../data/mockData';

const ContactsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contactType, setContactType] = useState<'all' | 'customers' | 'suppliers'>('all');

  const filteredContacts = mockCustomers.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone?.includes(searchTerm)
  );

  const totalCustomers = mockCustomers.length;
  const totalPurchases = mockCustomers.reduce((sum, c) => sum + c.totalPurchases, 0);
  const avgPurchase = totalPurchases / totalCustomers;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Gestion des Contacts</h1>
        <Button className="mt-4 md:mt-0 flex items-center space-x-2">
          <Plus size={20} />
          <span>Ajouter un contact</span>
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Clients</p>
              <p className="text-2xl font-bold text-white">{totalCustomers}</p>
            </div>
            <User className="text-blue-400" size={32} />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">CA Total Clients</p>
              <p className="text-2xl font-bold text-green-400">{totalPurchases.toFixed(2)}€</p>
            </div>
            <User className="text-green-400" size={32} />
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Panier Moyen</p>
              <p className="text-2xl font-bold text-yellow-400">{avgPurchase.toFixed(2)}€</p>
            </div>
            <User className="text-yellow-400" size={32} />
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
                placeholder="Rechercher par nom, email ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <select
            value={contactType}
            onChange={(e) => setContactType(e.target.value as any)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les contacts</option>
            <option value="customers">Clients</option>
            <option value="suppliers">Fournisseurs</option>
          </select>
        </div>
      </Card>

      {/* Liste des contacts */}
      <Card>
        <h2 className="text-xl font-semibold text-white mb-4">Liste des Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredContacts.map(contact => (
            <div key={contact.id} className="p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-medium text-white text-lg">{contact.name}</h3>
                  <p className="text-green-400 font-bold">
                    Total achats: {contact.totalPurchases.toFixed(2)}€
                  </p>
                </div>
                <Button size="sm" variant="secondary">
                  <Edit size={16} />
                </Button>
              </div>
              
              <div className="space-y-2">
                {contact.email && (
                  <div className="flex items-center text-gray-300">
                    <Mail size={16} className="mr-2 text-gray-400" />
                    <span className="text-sm">{contact.email}</span>
                  </div>
                )}
                
                {contact.phone && (
                  <div className="flex items-center text-gray-300">
                    <Phone size={16} className="mr-2 text-gray-400" />
                    <span className="text-sm">{contact.phone}</span>
                  </div>
                )}
                
                {contact.address && (
                  <div className="flex items-start text-gray-300">
                    <MapPin size={16} className="mr-2 text-gray-400 mt-0.5" />
                    <span className="text-sm">{contact.address}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-600">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Client depuis:</span>
                  <span className="text-white">Janvier 2024</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredContacts.length === 0 && (
          <div className="text-center py-8">
            <User className="text-gray-400 mx-auto mb-2" size={48} />
            <p className="text-gray-400">Aucun contact trouvé</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ContactsPage;