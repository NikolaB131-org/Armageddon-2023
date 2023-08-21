import { Passion_One } from 'next/font/google';
import styles from './Logo.module.css';

const passionOne = Passion_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

type Props = {
  className?: string;
};

function Logo({ className = '' }: Props) {
  return (
    <header className={`${styles.header} ${className}`}>
      <h2 className={`${styles.title} ${passionOne.className}`}>ARMAGEDDON 2023</h2>
      <p className={styles.subtitle}>ООО “Команда им. Б. Уиллиса”.<br />Взрываем астероиды с 1998 года.</p>
    </header>
  );
}

export default Logo;
