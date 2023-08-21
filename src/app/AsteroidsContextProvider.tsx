'use client';

import { AsteroidData } from '@/types';
import { DistanceUnitType } from '@/components/DistanceUnitSwitcher';
import { createContext, useState } from 'react';

type AsteroidsContextType = {
  asteroids: AsteroidData[],
  setAsteroids: React.Dispatch<React.SetStateAction<AsteroidData[]>>,
  orderedAsteroids: AsteroidData[],
  setOrderedAsteroids: React.Dispatch<React.SetStateAction<AsteroidData[]>>,
  distanceUnit: DistanceUnitType,
  setDistanceUnit: React.Dispatch<React.SetStateAction<DistanceUnitType>>
};

const defaultContextState: AsteroidsContextType = {
  asteroids: [],
  setAsteroids: () => {},
  orderedAsteroids: [],
  setOrderedAsteroids: () => {},
  distanceUnit: 'kilometers',
  setDistanceUnit: () => {},
};

export const AsteroidsContext = createContext<AsteroidsContextType>(defaultContextState);

function AsteroidsContextProvider({ children }: { children: React.ReactNode }) {
  const [asteroids, setAsteroids] = useState(defaultContextState.asteroids);
  const [orderedAsteroids, setOrderedAsteroids] = useState(defaultContextState.orderedAsteroids);
  const [distanceUnit, setDistanceUnit] = useState(defaultContextState.distanceUnit);

  return (
    <AsteroidsContext.Provider
      value={{
        asteroids,
        setAsteroids,
        orderedAsteroids,
        setOrderedAsteroids,
        distanceUnit,
        setDistanceUnit
      }}
    >{children}</AsteroidsContext.Provider>
  );
}

export default AsteroidsContextProvider;
