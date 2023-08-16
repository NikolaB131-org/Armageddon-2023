import { inclineFromNumber } from '@/utils/inclineFromNumber';
import Image from 'next/image';
import arrowLeftSvg from '../../../public/arrow-left.svg';
import arrowRightSvg from '../../../public/arrow-right.svg';
import asteroidPng from '../../../public/asteroid.png';
import styles from './Asteroid.module.css';

export type DistanceType = 'kilometers' | 'lunar';

type Props = {
  timestamp: number;
  name: string;
  diameter: number;
  selectedDistanceType: DistanceType;
  distanceKilometers: string;
  distanceLunar: string;
  inCart?: boolean;
  hazardous?: boolean;
  orderButtonHidden?: boolean;
};

export default function Asteroid({
  timestamp,
  name,
  diameter,
  selectedDistanceType,
  distanceKilometers,
  distanceLunar,
  inCart,
  hazardous,
  orderButtonHidden,
}: Props) {
  const months = ['янв', 'февр', 'марта', 'апр', 'мая', 'июня', 'июля', 'авг', 'сент', 'окт', 'нояб', 'дек'];
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let distance = '';
  if (selectedDistanceType === 'kilometers') {
    distance = new Intl.NumberFormat('ru-RU').format(+distanceKilometers) + ' км';
  } else if (selectedDistanceType === 'lunar') {
    const lunarEnding = inclineFromNumber(+distanceLunar, 'ая', 'ыe', 'ых');
    const orbitEnding = inclineFromNumber(+distanceLunar, 'а', 'ы', '');
    distance = `${distanceLunar} лунн${lunarEnding} орбит${orbitEnding}`;
  }

  return (
    <div className={styles.container}>
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

      {(!orderButtonHidden || hazardous) && (
        <div className={styles.footer}>
          {!orderButtonHidden && <button className={styles.footer_button}>ЗАКАЗАТЬ</button>}
          {hazardous && <span>⚠️ Опасен</span>}
        </div>
      )}
    </div>
  );
}
