'use client';

import { useState } from 'react';
import Asteroid, { DistanceType } from '@/components/Asteroid';
import Cart from '@/components/Cart';
import styles from './page.module.css';

export default function Home() {
  const [selectedDistanceType, setDistanceFilterType] = useState<DistanceType>('kilometers');

  const getSelectedSpanClassName = (type: DistanceType): string => {
    return selectedDistanceType === type ? styles.selected_distance_type : styles.unselected_distance_type;
  }
  const kilometersText = 'в километрах';
  const lunarText = 'в лунных орбитах';

  return (
    <div className={styles.container}>
      <div className={styles.asteroids}>
        <header className={styles.header}>
          <h1 className={styles.title}>Ближайшие подлёты астероидов</h1>
          <span
            className={getSelectedSpanClassName('kilometers')}
            onClick={() => setDistanceFilterType('kilometers')}
            data-text={kilometersText}
          >{kilometersText}</span>
          <span className={styles.divider}>|</span>
          <span
            className={getSelectedSpanClassName('lunar')}
            onClick={() => setDistanceFilterType('lunar')}
            data-text={lunarText}
          >{lunarText}</span>
        </header>
        <Asteroid timestamp={new Date().getTime()} selectedDistanceType={selectedDistanceType} distanceKilometers='1762598' distanceLunar='5' name='2021 FQ' diameter={235} hazardous />
        <Asteroid timestamp={new Date().getTime()} selectedDistanceType={selectedDistanceType} distanceKilometers='227313' distanceLunar='3' name='2021 FQ' diameter={124} />
      </div>
      <Cart asteroidsNumber={3} />
    </div>
  );
}
