import React from 'react';
import styles from './Hints.module.css';

export default function Hints(props) {
  const { hints, onClick } = props;
  return (
    <div className={styles.hints}>
      <h3>Latest searches:</h3>
      {hints.map((el) => <button type="button" className={styles.button} onClick={() => onClick(el)} key={el}>{el}</button>)}
    </div>
  );
}
