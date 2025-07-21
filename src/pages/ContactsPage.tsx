
import React, { useState, useMemo } from 'react';
import { Customer } from '../types';
import { mockCustomers, mockSuppliers } from '../data/mockData';
import {
  ContactList,
  ContactFormModal,
  ClientDetailModal,
} from '../components/contacts';
import ContactFilterSidebar from '../components/contacts/ContactFilterSidebar';
import SearchBar from '../components/contacts/SearchBar';
import MobileContactFilters from '../components/contacts/MobileContactFilters';

/**
 * Page de gestion des contacts (clients et fournisseurs) avec une nouvelle disposition.
 */
const ContactsPage: React.FC = () => {
  // --- ÉTATS LOCAUX ---
  const [activeContactType, setActiveContactType] = useState<'clients' | 'suppliers'>('clients');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedContact, setSelectedContact] = useState<Customer | null>(null);

  // --- DONNÉES FILTRÉES ---
  const currentContacts = useMemo(() =>
    activeContactType === 'clients' ? mockCustomers : mockSuppliers
  , [activeContactType]);

  const filteredContacts = useMemo(() => {
    if (!searchTerm) return currentContacts;
    return currentContacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone?.includes(searchTerm) ||
      contact.phone?.includes(searchTerm)
    );
  }, [currentContacts, searchTerm]);

  // --- GESTIONNAIRES D'ÉVÉNEMENTS ---
  const handleOpenFormModal = (mode: 'create' | 'edit', contact: Customer | null = null) => {
    setModalMode(mode);
    setSelectedContact(contact);
    setIsFormModalOpen(true);
  };

  const handleOpenDetailModal = (contact: Customer) => {
    setSelectedContact(contact);
    setIsDetailModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsFormModalOpen(false);
    setIsDetailModalOpen(false);
  };

  const handleSaveContact = (contactData: Partial<Customer>) => {
    console.log('Sauvegarde du contact:', contactData);
    // Logique de sauvegarde...
    handleCloseModals();
  };

  // --- RENDU DU COMPOSANT ---
  return (
    <div className="flex h-screen bg-black text-white">
      {/* Section gauche (Filtres) - Fond noir */}
      <aside className="hidden md:block md:w-72 lg:w-80 p-6 bg-black border-r border-gray-800">
        <ContactFilterSidebar
          activeType={activeContactType}
          onTypeChange={setActiveContactType}
          onAddContact={() => handleOpenFormModal('create')}
        />
      </aside>

      {/* Section droite (Contenu principal) - Fond gris foncé */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gray-900/50">
        {/* En-tête de la section principale */}
        <header className="sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10 border-b border-gray-800 px-4 sm:px-6 lg:px-8">
          <div className="pt-6 pb-4">
            <h1 className="text-2xl font-bold text-white">Gestion des Contacts</h1>
            <p className="text-sm text-gray-400">
              Gérez vos clients et fournisseurs en un seul endroit.
            </p>
          </div>
          <div className="pb-4">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
          {/* Filtres pour mobile - intégrés ici */}
          <MobileContactFilters 
            activeType={activeContactType}
            onTypeChange={setActiveContactType}
            onAddContact={() => handleOpenFormModal('create')}
          />
        </header>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <ContactList
            contacts={filteredContacts}
            onContactClick={handleOpenDetailModal}
            contactType={activeContactType}
          />
        </div>
      </main>

      {/* Modales */}
      <ContactFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseModals}
        onSave={handleSaveContact}
        contact={selectedContact}
        contactType={activeContactType}
        mode={modalMode}
      />

      <ClientDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleCloseModals}
        contact={selectedContact}
        onEdit={(contact) => {
          setIsDetailModalOpen(false);
          handleOpenFormModal('edit', contact);
        }}
        contactType={activeContactType}
      />
    </div>
  );
};

export default ContactsPage;
