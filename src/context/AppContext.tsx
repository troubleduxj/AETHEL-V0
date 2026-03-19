import React, { createContext, useContext, useState } from 'react';
import { AIEntity } from '../types';
import { mockEntities } from '../data/mockData';

interface AppContextType {
  roster: AIEntity[];
  addEntityToRoster: (entity: AIEntity) => void;
  updateEntity: (entity: AIEntity) => void;
  dataFragments: number;
  spendDataFragments: (amount: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roster, setRoster] = useState<AIEntity[]>(mockEntities);
  const [dataFragments, setDataFragments] = useState<number>(5000);

  const addEntityToRoster = (entity: AIEntity) => {
    setRoster((prev) => [...prev, entity]);
  };

  const updateEntity = (updatedEntity: AIEntity) => {
    setRoster((prev) => prev.map(e => e.id === updatedEntity.id ? updatedEntity : e));
  };

  const spendDataFragments = (amount: number) => {
    if (dataFragments >= amount) {
      setDataFragments((prev) => prev - amount);
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{ roster, addEntityToRoster, updateEntity, dataFragments, spendDataFragments }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
