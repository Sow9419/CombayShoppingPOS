import { useState } from 'react';

export const useNavigation = () => {
  const [currentPath, setCurrentPath] = useState('/caisse');

  const navigate = (path: string) => {
    setCurrentPath(path);
  };

  return { currentPath, navigate };
};