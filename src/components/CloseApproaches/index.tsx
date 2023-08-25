'use client';

import { DetailedAsteroidData } from '@/types';
import { useState, useRef, useEffect, } from 'react';
import { prependZero } from '@/utils/prependZero';
import { prettifyDate } from '@/utils/prettifyDate';
import DynamicSelectText from '../DynamicSelectText';
import styles from './CloseApproaches.module.css';

const formatDate = (date: Date) => {
  // UTC - убирает влияние часового пояса на данные
  const day = prependZero(date.getUTCDate());
  const month = prependZero(date.getUTCMonth() + 1);
  const year = date.getUTCFullYear();
  return `${day}.${month}.${year}`;
};

const orbitingBodyMap = {
  Earth: 'Земли',
  Moon: 'Луны',
  Mars: 'Марса',
  Venus: 'Венеры',
  Merc: 'Меркурия',
};

type Props = {
  approaches: DetailedAsteroidData['closeApproaches'];
};

function CloseApproaches({ approaches }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const orbitingBodyRef = useRef<HTMLParagraphElement>(null);

  const getSelectedApproachInfo = () => {
    if (selectedIndex === undefined) {
      return <p className={styles.approach_data_placeholder}>Выберите дату <span>☝️</span></p>;
    }

    const approach = approaches[selectedIndex];
    const date = new Date(approach.timestamp);
    // UTC - убирает влияние часового пояса на данные
    const hours = prependZero(date.getUTCHours());
    const miniutes = prependZero(date.getUTCMinutes());
    const seconds = prependZero(date.getUTCSeconds());
    const time = `${hours}:${miniutes}:${seconds}`;

    const orbitingBody = orbitingBodyMap[approach.orbitingBody as keyof typeof orbitingBodyMap];

    return (
      <>
        <h2 className={styles.approach_data_title}>Данные по сближению</h2>
        <p>Точная дата и время: {prettifyDate(date)}&nbsp;{time}</p>
        <DynamicSelectText title='Расстояние: ' items={[
          { text: 'км', value: Math.round(+approach.distance.kilometers)},
          { text: 'миль', value:  Math.round(+approach.distance.miles)},
          { text: 'а.е.', value: Number(approach.distance.astronomical).toFixed(4)},
          { text: 'лунных орбит', value: Number(approach.distance.lunar).toFixed(2)},
        ]} />
        <DynamicSelectText title='Относительная скорость:&nbsp;' items={[
          { text: 'км/ч', value: Math.round(+approach.relativeVelocity.kilometersPerHour)},
          { text: 'км/c', value: Number(approach.relativeVelocity.kilometersPerSecond).toFixed(2)},
          { text: 'миль/ч', value: Math.round(+approach.relativeVelocity.milesPerHour)},
        ]} />
        <p ref={orbitingBodyRef}>Летит по орбите вокруг&nbsp;<strong>{orbitingBody}</strong></p>
      </>
    );
  };

  useEffect(() => {
    orbitingBodyRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [selectedIndex]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Сближения с планетами:</h2>
      <div className={styles.table}>
        {approaches.map((approach, i) => {
          const date = new Date(approach.timestamp);
          const selectedClass = selectedIndex === i ? styles.selected : '';
          const currentYearClass = date.getFullYear() === new Date().getFullYear() ? styles.current_year : '';
          return (
            <div
              key={i}
              className={`${selectedClass} ${currentYearClass}`}
              onClick={() => setSelectedIndex(i)}
            >{formatDate(date)}</div>
          );
        })}
      </div>
      {getSelectedApproachInfo()}
    </div>
  );
}

export default CloseApproaches;
