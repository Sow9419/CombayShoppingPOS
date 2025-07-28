
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
      className="w-full flex items-center justify-center space-x-2 px-6 py-1 bg-zinc-200 hover:bg-blue-500 dark:bg-gray-800 dark:hover:bg-gray-600  rounded-lg transition-all duration-200 shadow-md hover:shadow-xl"
    >
      <Plus size={20} className='text-gray-900 dark:text-white'/>
      <span className="font-medium text-gray-900 dark:text-white">{buttonText}</span>
    </Button>
  );
};

export default AddContactButton;
