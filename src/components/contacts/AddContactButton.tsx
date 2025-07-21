
import React from 'react';
import { Plus } from 'lucide-react';
import Button from '../common/Button';

interface AddContactButtonProps {
  onClick: () => void;
  contactType: 'clients' | 'suppliers';
}

const AddContactButton: React.FC<AddContactButtonProps> = ({ onClick, contactType }) => {
  const buttonText = contactType === 'clients' ? 'Ajouter un client' : 'Ajouter un fournisseur';

  return (
    <Button 
      onClick={onClick}
      className="w-full flex items-center justify-center space-x-2 px-6 py-1 bg-green-950 hover:bg-green-800 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <Plus size={20} />
      <span className="font-medium">{buttonText}</span>
    </Button>
  );
};

export default AddContactButton;
