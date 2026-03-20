import React, { createContext, useContext, useState } from 'react';
import { AIEntity, Relationship } from '../types';
import { mockEntities } from '../data/mockData';

interface AppContextType {
  roster: AIEntity[];
  relationships: Relationship[];
  addEntityToRoster: (entity: AIEntity) => void;
  updateEntity: (entity: AIEntity) => void;
  dataFragments: number;
  spendDataFragments: (amount: number) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roster, setRoster] = useState<AIEntity[]>(mockEntities);
  const [relationships, setRelationships] = useState<Relationship[]>([
    { id: 'rel-1', sourceId: 'ent-001', targetId: 'ent-004', type: 'Friendly', strength: 85 },
    { id: 'rel-2', sourceId: 'ent-002', targetId: 'ent-003', type: 'Hostile', strength: 90 },
  ]);
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
    <AppContext.Provider value={{ roster, relationships, addEntityToRoster, updateEntity, dataFragments, spendDataFragments }}>
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
