import React from 'react';
import { X, User, Mail, Phone, MapPin, Calendar, ShoppingBag, TrendingUp, Edit } from 'lucide-react';
import { Customer } from '../../types';
import Button from '../common/Button';

interface ClientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Customer | null;
  onEdit: (contact: Customer) => void;
  contactType: 'clients' | 'suppliers';
}

const ClientDetailModal: React.FC<ClientDetailModalProps> = ({
  isOpen,
  onClose,
  contact,
  onEdit,
  contactType
}) => {
  if (!isOpen || !contact) return null;

  // Générer les initiales pour l'avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Générer une couleur d'avatar basée sur le nom
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-teal-500'
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Données simulées pour l'historique
  const mockStats = {
    totalOrders: contactType === 'clients' ? 12 : 8,
    averageOrder: contactType === 'clients' ? 85.50 : 1250.00,
    lastOrderDate: '2025-01-15',
    memberSince: '2024-03-15'
  };

  const recentOrders = [
    { id: '1', date: '2025-01-15', amount: 125.50, status: 'Livré' },
    { id: '2', date: '2025-01-10', amount: 89.90, status: 'Livré' },
    { id: '3', date: '2025-01-05', amount: 156.20, status: 'En cours' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            Détails du {contactType === 'clients' ? 'client' : 'fournisseur'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Profil */}
          <div className="flex items-start space-x-6 mb-8">
            <div className={`w-20 h-20 rounded-full ${getAvatarColor(contact.name)} flex items-center justify-center flex-shrink-0`}>
              <span className="text-white font-bold text-2xl">
                {getInitials(contact.name)}
              </span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{contact.name}</h3>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar size={16} className="mr-2" />
                    <span>{contactType === 'clients' ? 'Client' : 'Fournisseur'} depuis {formatDate(mockStats.memberSince)}</span>
                  </div>
                </div>
                
                <Button
                  onClick={() => onEdit(contact)}
                  variant="secondary"
                  className="flex items-center space-x-2"
                >
                  <Edit size={16} />
                  <span>Modifier</span>
                </Button>
              </div>
              
              {/* Informations de contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contact.email && (
                  <div className="flex items-center text-gray-300">
                    <Mail size={18} className="mr-3 text-gray-400" />
                    <span>{contact.email}</span>
                  </div>
                )}
                
                {contact.phone && (
                  <div className="flex items-center text-gray-300">
                    <Phone size={18} className="mr-3 text-gray-400" />
                    <span>{contact.phone}</span>
                  </div>
                )}
                
                
              </div>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">
                    {contactType === 'clients' ? 'Total Achats' : 'Total Livraisons'}
                  </p>
                  <p className="text-2xl font-bold text-green-400">
                    {contact.totalPurchases.toFixed(2)}€
                  </p>
                </div>
                <TrendingUp className="text-green-400" size={24} />
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">
                    {contactType === 'clients' ? 'Commandes' : 'Livraisons'}
                  </p>
                  <p className="text-2xl font-bold text-blue-400">{mockStats.totalOrders}</p>
                </div>
                <ShoppingBag className="text-blue-400" size={24} />
              </div>
            </div>
            
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Panier Moyen</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {mockStats.averageOrder.toFixed(2)}€
                  </p>
                </div>
                <User className="text-yellow-400" size={24} />
              </div>
            </div>
          </div>

          {/* Historique récent */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              {contactType === 'clients' ? 'Commandes récentes' : 'Livraisons récentes'}
            </h4>
            
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-white font-medium">#{order.id.padStart(6, '0')}</p>
                        <p className="text-gray-400 text-sm">{formatDate(order.date)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-green-400 font-semibold">
                        {order.amount.toFixed(2)}€
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Livré' 
                          ? 'bg-green-600 text-green-100'
                          : 'bg-yellow-600 text-yellow-100'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {recentOrders.length === 0 && (
              <div className="text-center py-8">
                <ShoppingBag className="text-gray-400 mx-auto mb-2" size={48} />
                <p className="text-gray-400">
                  Aucune {contactType === 'clients' ? 'commande' : 'livraison'} trouvée
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailModal;