'use client';

import { AsteroidData } from '@/types';
import { DistanceUnitType } from '../DistanceUnitSwitcher';
import { forwardRef, useContext, useEffect, memo } from 'react';
import { useRouter } from 'next/navigation';
import { AsteroidsContext } from '@/app/AsteroidsContextProvider';
import { inclineFromNumber } from '@/utils/inclineFromNumber';
import { prettifyDate } from '@/utils/prettifyDate';
import Image from 'next/image';
import arrowLeftSvg from '../../../public/arrow-left.svg';
import arrowRightSvg from '../../../public/arrow-right.svg';
import asteroidPng from '../../../public/asteroid.png';
import styles from './Asteroid.module.css';

type Props = {
  data: AsteroidData;
  distanceUnit: DistanceUnitType;
  isOrdered: boolean;
  isOrderButtonHidden?: boolean;
};

const Asteroid = forwardRef<HTMLDivElement, Props>(function Asteroid(
  { data, distanceUnit, isOrdered, isOrderButtonHidden }, ref
) {
  const router = useRouter();
  const { setOrderedAsteroids } = useContext(AsteroidsContext);
  const { id, timestamp, name, diameter, distanceKilometers, distanceLunar, isHazardous } = data;

  const asteroidUrl = `/asteroid/${id}`;

  useEffect(() => {
    router.prefetch(asteroidUrl); // префетчинг страницы с астероидом для более быстрой загрузки
  }, [router, asteroidUrl]);

  let distance = '';
  switch (distanceUnit) {
    case 'kilometers':
      distance = new Intl.NumberFormat('ru-RU').format(+distanceKilometers) + ' км';
      break;
    case 'lunar':
      const lunarEnding = inclineFromNumber(+distanceLunar, 'ая', 'ыe', 'ых');
      const orbitEnding = inclineFromNumber(+distanceLunar, 'а', 'ы', '');
      distance = `${distanceLunar} лунн${lunarEnding} орбит${orbitEnding}`;
      break;
  }

  const onAddToCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // чтобы не было перехода на страницу астероида
    setOrderedAsteroids(prev => [...prev, data])
  };

  const onDeleteFromCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // чтобы не было перехода на страницу астероида
    setOrderedAsteroids(prev => prev.filter(asteroid => asteroid.id !== id))
  };

  const getOrderButton = () => {
    if (isOrdered) {
      return (
        <button className={`${styles.footer_button} ${styles.footer_button_ordered}`} onClick={onDeleteFromCartClick}>
          В КОРЗИНЕ
        </button>
      );
    }
    return <button className={styles.footer_button} onClick={onAddToCartClick}>ЗАКАЗАТЬ</button>;
  };

  return (
    <div className={styles.container} onClick={() => router.push(asteroidUrl)} ref={ref}>
      <h2 className={styles.date}>{prettifyDate(new Date(timestamp))}</h2>

      <div className={styles.info}>
        <div>
          <div className={styles.distance}>{distance}</div>
          <div className={styles.distance_line_container}>
            <Image src={arrowLeftSvg} alt='' />
            <div className={styles.distance_line}></div>
            <Image src={arrowRightSvg} alt='' />
          </div>
        </div>
        <Image
          src={asteroidPng}
          alt=''
          className={diameter > 200 ? styles.asteroidImg_big : styles.asteroidImg}
        />
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.diameter}>Ø {diameter} м</div>
        </div>
      </div>

      {(!isOrderButtonHidden || isHazardous) && (
        <div className={styles.footer}>
          {!isOrderButtonHidden && getOrderButton()}
          {isHazardous && <span>⚠️ Опасен</span>}
        </div>
      )}
    </div>
  );
});

// Мемоизация нужна чтобы при добавлении спинера в компонент Asteroids все астероиды не ререндерились
export default memo(Asteroid);
