import { NextResponse } from 'next/server';
import { fetchAsteroids } from '@/api/fetchAsteroids';

type Params = {
  params: { date: string };
};

// Инкапсулировал запрос через Route handler чтобы не использовать API прямо ключ на клиенте
// (так же можно было воспользоваться server-actions, но они пока что в альфе)
export async function GET(request: Request, { params }: Params) {
  const asteroids = await fetchAsteroids(params.date);
  return NextResponse.json(asteroids);
}
