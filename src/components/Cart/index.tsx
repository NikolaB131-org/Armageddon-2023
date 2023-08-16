import { inclineFromNumber } from '@/utils/inclineFromNumber';
import Link from 'next/link';
import styles from './Cart.module.css';

type Props = {
  asteroidsNumber: number;
};

export default function Cart({ asteroidsNumber }: Props) {
  const asteroidsEnding = inclineFromNumber(asteroidsNumber, '', 'а', 'ов');

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Корзина</h2>
        <div>{asteroidsNumber} астероид{asteroidsEnding}</div>
      </div>
      <Link href={'/order-success'}>
        <button className={styles.button}>Отправить</button>
      </Link>
    </div>
  );
}
