import React from 'react';
import { Users, Building2 } from 'lucide-react';
import { Customer } from '../../types';
import ContactListItem from './ContactListItem';

interface ContactListProps {
  contacts: Customer[];
  onContactClick: (contact: Customer) => void;
  contactType: 'clients' | 'suppliers';
  isLoading?: boolean;
}

const ContactList: React.FC<ContactListProps> = ({ 
  contacts, 
  onContactClick, 
  contactType,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (contacts.length === 0) {
    const Icon = contactType === 'clients' ? Users : Building2;
    const message = contactType === 'clients' ? 'Aucun client trouvé' : 'Aucun fournisseur trouvé';
    
    return (
      <div className="text-center py-12">
        <Icon className="text-gray-400 mx-auto mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">{message}</h3>
        <p className="text-gray-400">
          {contactType === 'clients' 
            ? 'Commencez par ajouter votre premier client'
            : 'Commencez par ajouter votre premier fournisseur'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <ContactListItem
          key={contact.id}
          contact={contact}
          onClick={onContactClick}
          contactType={contactType}
        />
      ))}
      
      {/* Indicateur de chargement pour le scroll infini */}
      {contacts.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center text-gray-400 text-sm">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
            Chargement de plus de contacts...
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;