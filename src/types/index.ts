export type AsteroidData = {
  id: string;
  timestamp: number;
  name: string;
  diameter: number;
  distanceKilometers: number;
  distanceLunar: number;
  isHazardous: boolean;
};

type CloseApproach = {
  timestamp: number;
  distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  relativeVelocity: {
    kilometersPerSecond: string;
    kilometersPerHour: string;
    milesPerHour: string;
  };
  orbitingBody: string;
};

type Dimension = {
  min: number;
  max: number;
};

export interface DetailedAsteroidData extends Omit<
  AsteroidData, 'timestamp' | 'diameter' | 'distanceKilometers' | 'distanceLunar'
> {
  absoluteMagnitude: number;
  diameter: {
    kilometers: Dimension;
    meters: Dimension;
    miles: Dimension;
    feet: Dimension;
  };
  closeApproaches: CloseApproach[];
};
