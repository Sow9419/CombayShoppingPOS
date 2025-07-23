
import React, { useState, useEffect } from 'react';
import { X, User, Phone, Building2 } from 'lucide-react';
import { Customer } from '../../types';
import Button from '../common/Button';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (contact: Partial<Customer>) => void;
  contact?: Customer | null;
  contactType: 'clients' | 'suppliers';
  mode: 'create' | 'edit';
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  contact,
  contactType,
  mode
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (contact && mode === 'edit') {
      setFormData({
        name: contact.name || '',
        phone: contact.phone || '',
        company: '' // Ajouter si nécessaire dans le type Customer
      });
    } else {
      setFormData({
        name: '',
        phone: '',
        company: ''
      });
    }
    setErrors({});
  }, [contact, mode, isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (formData.phone && !/^[+]?[0-9\s\-\(\)]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const contactData = {
      ...formData,
      id: contact?.id || Date.now().toString(),
      totalPurchases: contact?.totalPurchases || 0
    };
    
    onSave(contactData);
    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  const title = mode === 'create' 
    ? `Ajouter un ${contactType === 'clients' ? 'client' : 'fournisseur'}`
    : `Modifier ${contactType === 'clients' ? 'le client' : 'le fournisseur'}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
            {contactType === 'clients' ? <User size={24} /> : <Building2 size={24} />}
            <span>{title}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <User size={16} className="inline mr-2" />
              Nom complet *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="Entrez le nom complet"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Phone size={16} className="inline mr-2" />
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className={`w-full px-3 py-2 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? 'border-red-500' : 'border-gray-600'
              }`}
              placeholder="+33 1 23 45 67 89"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Entreprise (pour les fournisseurs) */}
          {contactType === 'suppliers' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Building2 size={16} className="inline mr-2" />
                Entreprise
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleChange('company', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nom de l'entreprise"
              />
            </div>
          )}

          {/* Boutons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="flex-1"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {mode === 'create' ? 'Ajouter' : 'Modifier'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactFormModal;
