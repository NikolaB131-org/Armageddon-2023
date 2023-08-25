import 'server-only';

import { DetailedAsteroidData } from '@/types';
import { LookupResponse } from '@/types/api/lookupResponse';

export async function fetchAsteroid(id: string): Promise<DetailedAsteroidData | undefined> {
  const url = `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${process.env.DATA_API_KEY}`;
  const res = await fetch(url);

  if (res.ok) {
    const data: LookupResponse = await res.json();

    const diameter: DetailedAsteroidData['diameter'] = {
      kilometers: {
        min: data.estimated_diameter.kilometers.estimated_diameter_min,
        max: data.estimated_diameter.kilometers.estimated_diameter_max,
      },
      meters: {
        min: data.estimated_diameter.meters.estimated_diameter_min,
        max: data.estimated_diameter.meters.estimated_diameter_max,
      },
      miles: {
        min: data.estimated_diameter.miles.estimated_diameter_min,
        max: data.estimated_diameter.miles.estimated_diameter_max,
      },
      feet: {
        min: data.estimated_diameter.feet.estimated_diameter_min,
        max: data.estimated_diameter.feet.estimated_diameter_max,
      },
    };

    const closeApproaches: DetailedAsteroidData['closeApproaches'] = data.close_approach_data.map(closeApproach => ({
      timestamp: closeApproach.epoch_date_close_approach,
      distance: {
        astronomical: closeApproach.miss_distance.astronomical,
        lunar: closeApproach.miss_distance.lunar,
        kilometers: closeApproach.miss_distance.kilometers,
        miles: closeApproach.miss_distance.miles,
      },
      relativeVelocity: {
        kilometersPerSecond: closeApproach.relative_velocity.kilometers_per_second,
        kilometersPerHour: closeApproach.relative_velocity.kilometers_per_hour,
        milesPerHour: closeApproach.relative_velocity.miles_per_hour,
      },
      orbitingBody: closeApproach.orbiting_body,
    }));

    return {
      id: data.id,
      name: data.name.replace(/\(|\)/g, ''), // убирает '(' и ')'
      isHazardous: data.is_potentially_hazardous_asteroid,
      absoluteMagnitude: data.absolute_magnitude_h,
      diameter,
      closeApproaches,
    };
  }
}
