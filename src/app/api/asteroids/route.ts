import { NextResponse } from 'next/server';
import { fetchAsteroids } from '@/app/api/asteroids/fetchAsteroids';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date'); // получаем 'date' из query параметров

  if (!date) {
    return NextResponse.json({ error: 'date parameter is not specified' }, { status: 400 });
  }

  const asteroids = await fetchAsteroids(date);
  return NextResponse.json(asteroids);
}
