'use client';

import { AsteroidData } from '@/types';
import { useContext, useState, useRef, useCallback } from 'react';
import { AsteroidsContext } from '@/app/AsteroidsContextProvider';
import { getIsoDate } from '@/utils/getIsoDate';
import Asteroid from '../Asteroid';
import Spinner from '../Spinner';

const addOneDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
};

type Props = {
  initialAsteroids?: AsteroidData[];
};

function Asteroids({ initialAsteroids }: Props) {
  const { distanceUnit, orderedAsteroids } = useContext(AsteroidsContext);
  const [asteroids, setAsteroids] = useState<AsteroidData[]>(initialAsteroids ?? []);

  const [isLoading, setIsLoading] = useState(false);
  const [nextFetchDate, setNextFetchDate] = useState<Date>(() => addOneDay(new Date()));
  const intersectionObserver = useRef<IntersectionObserver>(); // useRef для того чтобы сохранять информацию при ререндерах

  const lastAsteroidRef = useCallback((asteroid: HTMLDivElement) => {
    if (isLoading) return;

    if (intersectionObserver.current) {
      intersectionObserver.current.disconnect(); // удаляем предыдущий observer
    }

    intersectionObserver.current = new IntersectionObserver(async asteroids => { // создаем observer
      if (asteroids[0].isIntersecting) { // если элемент во вьюпорте
        setIsLoading(true); // начало загрузки

        const res = await fetch(`/api/asteroids?date=${getIsoDate(nextFetchDate)}`);
        res.json().then((asteroids: AsteroidData[]) => {
          if (asteroids.length) { // если ответ не пустой
            setAsteroids(prev => [...prev, ...asteroids]);
            setNextFetchDate(prev => addOneDay(prev)); // прибавляем 1 день
          }
          setIsLoading(false); // конец загрузки
        })

      }
    });

    if (asteroid) { // если есть ссылка на элемент
      intersectionObserver.current.observe(asteroid);
    }
  }, [isLoading, nextFetchDate]);

  const orderedAsteroidsIds = orderedAsteroids.map(asteroid => asteroid.id);

  return (
    <>
      {asteroids.map((asteroid, i) => (
        <Asteroid
          ref={asteroids.length === i + 1 // вешаем на последний элемент ссылку для intersectionObserver
            ? lastAsteroidRef
            : undefined}
          key={asteroid.id}
          distanceUnit={distanceUnit}
          isOrdered={orderedAsteroidsIds.includes(asteroid.id)} // если астероид в корзине, рисуем другую кнопку
          data={asteroid}
        />
      ))}
      {isLoading && <Spinner />}
    </>
  );
}

export default Asteroids;
