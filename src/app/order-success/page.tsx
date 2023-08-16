import Asteroid from '@/components/Asteroid';
import styles from './page.module.css';

export default function Cart() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Заказ отправлен!</h1>
      <Asteroid timestamp={new Date().getTime()} selectedDistanceType='kilometers' distanceKilometers='12625475' distanceLunar='3' name='2021 FQ' diameter={235} hazardous orderButtonHidden />
    </header>
  );
}
