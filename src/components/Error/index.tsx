import Link from 'next/link';
import styles from './Error.module.css';

type Props = {
  message: string;
};

function Error({ message }: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Упс! Что-то пошло не так</h1>
      <p className={styles.message}>{message}</p>
      <Link href={'/'}>
        <button className={styles.button}>Вернуться на главную</button>
      </Link>
    </div>
  );
}

export default Error;
