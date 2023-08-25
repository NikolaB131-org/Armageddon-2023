import { NextResponse } from 'next/server';
import { fetchAsteroid } from '@/api/fetchAsteroid';

type Params = {
  params: { id: string };
};

// Инкапсулировал запрос через Route handler чтобы не использовать API прямо ключ на клиенте
// (так же можно было воспользоваться server-actions, но они пока что в альфе)
export async function GET(request: Request, { params }: Params) {
  const asteroids = await fetchAsteroid(params.id);
  return NextResponse.json(asteroids);
}
