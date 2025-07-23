import { User } from "lucide-react";

interface MobileHeaderProps {
  onProfileClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onProfileClick }) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-black border-b border-gray-800 flex items-center justify-between px-4 z-50">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">POS</span>
        </div>
        <span className="text-white font-semibold ml-3">Point de Vente</span>
      </div>
      
      <button onClick={onProfileClick} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
        <User size={20} />
      </button>
    </header>
  );
};

export default MobileHeader;