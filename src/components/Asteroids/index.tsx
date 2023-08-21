'use client';

import { AsteroidData } from '@/types';
import { useContext, useState, useRef, useCallback } from 'react';
import { AsteroidsContext } from '@/app/AsteroidsContextProvider';
import { getIsoDate } from '@/utils/getIsoDate';
import Asteroid from '../Asteroid';
import Spinner from '../Spinner';
import styles from './Asteroids.module.css';

const addOneDay = (date: Date) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
};

type Props = {
  initialAsteroids?: AsteroidData[];
  isRenderedInCart?: boolean;
};

function Asteroids({ initialAsteroids, isRenderedInCart }: Props) {
  const { distanceUnit, orderedAsteroids } = useContext(AsteroidsContext);

  const getInitialAsteroids = (): AsteroidData[] => {
    if (isRenderedInCart) return orderedAsteroids;
    if (initialAsteroids) return initialAsteroids;
    return [];
  };

  const [asteroids, setAsteroids] = useState<AsteroidData[]>(getInitialAsteroids);
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
    <div className={styles.container}>
      {asteroids.map((asteroid, i) => (
        <Asteroid
          // Если рендеринг не на странице корзины и элемент последний, то вешаем ссылку
          ref={!isRenderedInCart && asteroids.length === i + 1 ? lastAsteroidRef : undefined}
          key={asteroid.id}
          data={asteroid}
          distanceUnit={distanceUnit}
          isOrdered={orderedAsteroidsIds.includes(asteroid.id)} // если астероид в корзине, рисуем другую кнопку
          isOrderButtonHidden={isRenderedInCart}
        />
      ))}
      {isLoading && <Spinner />}
    </div>
  );
}

export default Asteroids;
