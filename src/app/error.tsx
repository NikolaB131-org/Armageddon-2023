'use client';

import Link from 'next/link';
import styles from './error.module.css';

type Props = {
  error: Error;
};

function Error({ error }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Упс! Что-то пошло не так</h1>
      <p className={styles.message}>{error.message}</p>
      <Link href={'/'}>
        <button className={styles.button}>Вернуться на главную</button>
      </Link>
    </div>
  );
}

export default Error;
