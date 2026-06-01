import { createContext, useContext, useState } from 'react';
import { cities } from '../data/mockData';

const CityContext = createContext();

export function CityProvider({ children }) {
  // Initialize to Chennai (cities[0]) by default so the header says Chennai and the theatres match
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}

