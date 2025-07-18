import React, { useState } from 'react';
import { X, UserPlus, Search } from 'lucide-react';
import { Customer } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  onAddNewCustomer: () => void;
}

const SelectCustomerModal: React.FC<Props> = ({ isOpen, onClose, customers, onSelectCustomer, onAddNewCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg h-3/4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Sélectionner un client</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar pr-2">
          {filteredCustomers.map(customer => (
            <div
              key={customer.id}
              onClick={() => onSelectCustomer(customer)}
              className="p-3 mb-2 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-white">{customer.name}</p>
                <p className="text-sm text-gray-400">{customer.phone}</p>
              </div>
              <p className="text-sm text-gray-300">{customer.totalPurchases?.toFixed(2)} FCFA</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button
            onClick={onAddNewCustomer}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
          >
            <UserPlus size={18} className="mr-2" />
            Ajouter un nouveau client
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCustomerModal;
