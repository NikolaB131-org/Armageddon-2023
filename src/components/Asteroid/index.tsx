'use client';

import { AsteroidData } from '@/types';
import { DistanceUnitType } from '../DistanceUnitSwitcher';
import { forwardRef, memo, useContext } from 'react';
import { AsteroidsContext } from '@/app/AsteroidsContextProvider';
import { inclineFromNumber } from '@/utils/inclineFromNumber';
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
  const { setOrderedAsteroids } = useContext(AsteroidsContext);
  const { id, date, name, diameter, distanceKilometers, distanceLunar, isHazardous } = data;

  const months = ['янв', 'февр', 'марта', 'апр', 'мая', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек'];
  const dateSplitted = date.split('-');
  const day = +dateSplitted[2];
  const month = months[+dateSplitted[1] - 1];
  const year = dateSplitted[0];

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

  const onAddToCartClick = () => {
    setOrderedAsteroids(prev => [...prev, data])
  };

  const onDeleteFromCartClick = () => {
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
    <div className={styles.container} ref={ref}>
      <h2 className={styles.date}>{`${day} ${month} ${year}`}</h2>

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
