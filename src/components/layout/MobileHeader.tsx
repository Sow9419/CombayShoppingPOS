import { User } from "lucide-react";

interface MobileHeaderProps {
  onProfileClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onProfileClick }) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-800 flex items-center justify-between px-4 z-50">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">POS</span>
        </div>
        <span className="text-gray-700 dark:text-white font-semibold ml-3">Coubaty Shopping</span>
      </div>
      
      <button onClick={onProfileClick} className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center text-gray-900  dark:text-gray-300 dark:hover:text-white transition-colors">
        <User size={20} />
      </button>
    </header>
  );
};

export default MobileHeader;