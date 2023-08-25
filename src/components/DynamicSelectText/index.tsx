'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import arrowDownSvg from '../../../public/arrow-down.svg'
import styles from './DynamicSelectText.module.css';

type Item = {
  text: string;
  value: string | number;
};

type Props = {
  title: string;
  items: Item[];
};

function DynamicSelectText({ title, items }: Props) {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  useEffect(() => {
    setSelectedItem(items[0]);
  }, [items]);

  // Переносим в начало массива текущий выбранный item
  const menuItems = [selectedItem, ...items.filter(item => item.text !== selectedItem.text)];

  return (
    <div>
      <span>{title}</span>
      <span className={styles.nowrap}>
        <span>{selectedItem.value} </span>

        <span className={styles.container_dropdown}>
          <button className={styles.button}>
            <span>{selectedItem.text}</span>
            <Image className={styles.arrow} src={arrowDownSvg} alt='' />
          </button>

          <div className={styles.menu}>
            {menuItems.map((item, i) => (
              <div key={i} onMouseDown={() => setSelectedItem(item)}>{item.text}</div>
            ))}
          </div>
        </span>
      </span>
    </div>
  );
}

export default DynamicSelectText;
