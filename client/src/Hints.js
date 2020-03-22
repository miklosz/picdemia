import React, { useState, useEffect } from 'react';
import styles from './Hints.module.css';

export default function Hints(props) {
  const { query, onClick } = props;
  const [hints, setHints] = useState([query]);

  useEffect(() => {
    const updatedHints = [...hints, query];
    setHints([...new Set(updatedHints)]);
  }, [query]);


  return (
    <div className={styles.hints}>
      <h3>Latest searches:</h3>
      {(hints.length > 0)
        && hints.map((el) => <button type="button" className={styles.button} onClick={(ev) => onClick(el, ev)} key={el}>{el}</button>)}
    </div>
  );
}
