import React, { createContext, useContext, useState } from 'react';
import { AIEntity, Relationship } from '../types';
import { mockEntities } from '../data/mockData';

interface UserProfile {
  username: string;
  email: string;
  joinDate: string;
  lastCheckIn: string | null;
  inviteCode: string;
}

interface AppContextType {
  roster: AIEntity[];
  relationships: Relationship[];
  addEntityToRoster: (entity: AIEntity) => void;
  updateEntity: (entity: AIEntity) => void;
  dataFragments: number;
  spendDataFragments: (amount: number) => boolean;
  addDataFragments: (amount: number) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  checkIn: () => { success: boolean; amount: number; message: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roster, setRoster] = useState<AIEntity[]>(mockEntities);
  const [relationships, setRelationships] = useState<Relationship[]>([
    { id: 'rel-1', sourceId: 'ent-001', targetId: 'ent-004', type: 'Friendly', strength: 85 },
    { id: 'rel-2', sourceId: 'ent-002', targetId: 'ent-003', type: 'Hostile', strength: 90 },
  ]);
  const [dataFragments, setDataFragments] = useState<number>(5000);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'NEURAL_PILOT_01',
    email: 'duxiaojun1983@gmail.com',
    joinDate: '2026-03-20',
    lastCheckIn: null,
    inviteCode: 'AETHEL-X92-K01'
  });

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

  const addDataFragments = (amount: number) => {
    setDataFragments((prev) => prev + amount);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  const checkIn = () => {
    const today = new Date().toISOString().split('T')[0];
    if (userProfile.lastCheckIn === today) {
      return { success: false, amount: 0, message: 'Already checked in today.' };
    }
    const reward = 500;
    addDataFragments(reward);
    updateUserProfile({ lastCheckIn: today });
    return { success: true, amount: reward, message: `Successfully checked in! Received ${reward} DF.` };
  };

  return (
    <AppContext.Provider value={{ 
      roster, 
      relationships, 
      addEntityToRoster, 
      updateEntity, 
      dataFragments, 
      spendDataFragments,
      addDataFragments,
      userProfile,
      updateUserProfile,
      checkIn
    }}>
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
