'use client';

import { useContext } from 'react';
import { AsteroidsContext } from '@/app/AsteroidsContextProvider';
import styles from './DistanceUnitSwitcher.module.css';

export type DistanceUnitType = 'kilometers' | 'lunar';

function DistanceUnitSwitcher() {
  const { distanceUnit, setDistanceUnit } = useContext(AsteroidsContext);

  const getSelectedSpanClassName = (unit: DistanceUnitType): string => {
    return distanceUnit === unit ? styles.selected_unit : styles.unselected_unit;
  };
  const kilometersText = 'в километрах';
  const lunarText = 'в лунных орбитах';

  return (
    <div className={styles.container}>
      <span
        className={getSelectedSpanClassName('kilometers')}
        onClick={() => setDistanceUnit('kilometers')}
        data-text={kilometersText}
      >{kilometersText}</span>

      <span className={styles.divider}>|</span>

      <span
        className={getSelectedSpanClassName('lunar')}
        onClick={() => setDistanceUnit('lunar')}
        data-text={lunarText}
      >{lunarText}</span>
    </div>
  );
}

export default DistanceUnitSwitcher;
