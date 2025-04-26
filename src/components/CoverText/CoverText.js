import React from 'react';
import styles from './CoverText.module.css';

export default function CoverText({ children, title = "你知道的太多了" }) {
  return (
    <span>
    &nbsp;
    <span className={styles.cover} title={title}>
      {children}
    </span>
    &nbsp;
    </span>
  );
}