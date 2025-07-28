import React from 'react';
import { Phone, ShoppingBag, Calendar } from 'lucide-react';
import { Customer } from '../../types';

interface ContactListItemProps {
  contact: Customer;
  onClick: (contact: Customer) => void;
  contactType: 'clients' | 'suppliers';
}

const ContactListItem: React.FC<ContactListItemProps> = ({ contact, onClick, contactType }) => {
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
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div 
      onClick={() => onClick(contact)}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 hover:dark:bg-gray-750 transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-700  group"
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full ${getAvatarColor(contact.name)} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-semibold text-lg">
            {getInitials(contact.name)}
          </span>
        </div>
        
        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          {/* Nom et informations principales */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-black dark:text-white font-semibold text-lg group-hover:text-blue-800 dark:group-hover:text-blue-600 transition-colors duration-200">
                {contact.name}
              </h3>
              {contact.phone && (
                <div className="flex items-center text-gray-700 dark:text-gray-400 text-sm mt-1">
                  <Phone size={14} className="mr-1" />
                  <span>{contact.phone}</span>
                </div>
              )}
            </div>
            
            {/* Badge d'information */}
            <div className="flex flex-col items-end">
              <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-1">
                <div className="flex items-center space-x-1">
                  <ShoppingBag size={14} />
                  <span>{contactType === 'clients' ? '4 Achats' : '12 Livraisons'}</span>
                </div>
              </div>
              <div className="text-gray-700 dark:text-green-400 font-semibold text-sm">
                {contact.totalPurchases.toFixed(2)}€
              </div>
            </div>
          </div>
          
          
          
          {/* Dernière activité */}
          <div className="flex items-center text-gray-400 text-sm pt-2 border-t border-zinc-200 dark:border-gray-700">
            <Calendar size={14} className="mr-2 text-gray-500 dark:text-gray-400" />
            <span className='text-gray-500 dark:text-gray-400'>
              {contactType === 'clients' ? 'Dernier achat' : 'Dernière livraison'} : {formatDate('2025-07-04')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;