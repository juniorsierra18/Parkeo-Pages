import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../api';

interface ParkingContextType {
  maxSpaces: number;
  setMaxSpaces: (spaces: number) => void;
  hourlyRate: number;
  setHourlyRate: (rate: number) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  isRootAdmin: boolean;
  setIsRootAdmin: (isRootAdmin: boolean) => void;
  occupiedSpaces: number;
  availableSpaces: number;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export const ParkingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [maxSpaces, setMaxSpaces] = useState(50);
  const [hourlyRate, setHourlyRate] = useState(5);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRootAdmin, setIsRootAdmin] = useState(false);
  const [occupiedSpaces, setOccupiedSpaces] = useState(0);

  const updateOccupiedSpaces = async () => {
    try {
      const response = await api.getClients();
      setOccupiedSpaces(response.data.length);
    } catch (error) {
      console.error('Error fetching occupied spaces:', error);
    }
  };

  useEffect(() => {
    updateOccupiedSpaces();
    // Poll every 5 seconds
    const interval = setInterval(updateOccupiedSpaces, 5000);
    return () => clearInterval(interval);
  }, []);

  const availableSpaces = Math.max(0, maxSpaces - occupiedSpaces);

  return (
    <ParkingContext.Provider value={{
      maxSpaces,
      setMaxSpaces,
      hourlyRate,
      setHourlyRate,
      isAdmin,
      setIsAdmin,
      isRootAdmin,
      setIsRootAdmin,
      occupiedSpaces,
      availableSpaces,
    }}>
      {children}
    </ParkingContext.Provider>
  );
};

export const useParking = () => {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error('useParking must be used within a ParkingProvider');
  }
  return context;
};