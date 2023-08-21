import { fetchAsteroids } from '@/app/api/asteroids/fetchAsteroids';
import { getIsoDate } from '@/utils/getIsoDate';
import DistanceUnitSwitcher from '@/components/DistanceUnitSwitcher';
import Asteroids from '@/components/Asteroids';
import Cart from '@/components/Cart';
import styles from './page.module.css';

async function Home() {
  const initialAsteroids = await fetchAsteroids(getIsoDate(new Date()));

  return (
    <div className={styles.container}>
      <div className={styles.asteroids}>
        <header className={styles.header}>
          <h1 className={styles.title}>Ближайшие подлёты астероидов</h1>
          <DistanceUnitSwitcher />
        </header>
        <Asteroids initialAsteroids={initialAsteroids} />
      </div>
      <Cart />
    </div>
  );
}

export default Home;
