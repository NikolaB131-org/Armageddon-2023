import 'server-only';
import { AsteroidData } from '@/types';
import { FeedResponse } from '@/types/apiTypes';

export async function fetchAsteroids(date: string) {
  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${process.env.DATA_API_KEY}`;
  const res = await fetch(url);

  const asteroids: AsteroidData[] = [];
  if (res.ok) {
    const data: FeedResponse = await res.json();

    for (const asteroid of data.near_earth_objects[date]) {
      const name = asteroid.name.replace(/\(|\)/g, ''); // убирает '(' и ')'

      const diameter = Math.round( // среднее арифметическое из двух диаметров
        (asteroid.estimated_diameter.meters.estimated_diameter_min +
        asteroid.estimated_diameter.meters.estimated_diameter_max) / 2
      );

      const distanceKilometers = Math.round(+asteroid.close_approach_data[0].miss_distance.kilometers).toString();
      const distanceLunar = Math.round(+asteroid.close_approach_data[0].miss_distance.lunar).toString();

      asteroids.push({
        id: asteroid.id,
        date: asteroid.close_approach_data[0].close_approach_date,
        name,
        diameter,
        distanceKilometers,
        distanceLunar,
        isHazardous: asteroid.is_potentially_hazardous_asteroid,
      });
    }
  }

  return asteroids;
}
