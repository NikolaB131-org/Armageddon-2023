import Asteroids from '@/components/Asteroids';
import styles from './page.module.css';

function Page() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Заказ отправлен!</h1>
      <Asteroids isRenderedInCart />
    </div>
  );
}

export default Page;
