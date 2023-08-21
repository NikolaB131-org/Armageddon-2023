import './globals.css';
import type { Metadata } from 'next';
import AsteroidsContextProvider from './AsteroidsContextProvider';
import Logo from '@/components/Logo';
import Image from 'next/image'
import earthJpg from '../../public/earth.jpg';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: 'Armageddon 2023',
  description: 'Онлайн-сервис по мониторингу и уничтожению опасных астероидов на основе данных API NASA',
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={styles.body}>
        <header>
          <Logo className={styles.logo}/>
        </header>
        <main className={styles.main}>
          <AsteroidsContextProvider>
            {children}
          </AsteroidsContextProvider>
        </main>
        <footer className={styles.footer}>
          <p>© Все права и планета защищены</p>
        </footer>
        <Image
          src={earthJpg}
          alt=''
          className={styles.background_image}
          sizes='(min-width: 1200px) 536px, 377px' // размеры те же что и в css media запросах
          quality={100}
          priority
        />
      </body>
    </html>
  );
}

export default RootLayout;
