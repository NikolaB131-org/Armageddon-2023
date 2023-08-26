import 'server-only';

import { AsteroidData } from '@/types';
import { FeedResponse } from '@/types/api/feedResponse';

export async function fetchAsteroids(date: string): Promise<AsteroidData[]> {
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${process.env.DATA_API_KEY}`;
  const res = await fetch(url);
  const asteroids: AsteroidData[] = [];

  console.log('SERVER LOG:', date, res);
  if (res.ok) {
    const data: FeedResponse = await res.json();

    for (const asteroid of data.near_earth_objects[date]) {
      const diameter = Math.round( // среднее арифметическое из двух диаметров
        (asteroid.estimated_diameter.meters.estimated_diameter_min +
        asteroid.estimated_diameter.meters.estimated_diameter_max) / 2
      );

      const distanceKilometers = Math.round(+asteroid.close_approach_data[0].miss_distance.kilometers);
      const distanceLunar = Math.round(+asteroid.close_approach_data[0].miss_distance.lunar);

      asteroids.push({
        id: asteroid.id,
        timestamp: asteroid.close_approach_data[0].epoch_date_close_approach,
        name: asteroid.name.replace(/\(|\)/g, ''), // убирает '(' и ')'
        diameter,
        distanceKilometers,
        distanceLunar,
        isHazardous: asteroid.is_potentially_hazardous_asteroid,
      });
    }
  }

  return asteroids;
}
