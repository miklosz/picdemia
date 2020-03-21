import React from 'react';
import styles from './Search.module.css';

export default function Search(props) {
  const { onSubmit, onChange, query } = props;
  return (
    <form onSubmit={onSubmit} method="POST">
      <label htmlFor="search">Search for images</label>
      <input onChange={onChange} placeholder="Search for images" value={query} name="search" id="search" />
      <button className={styles.button} onClick={onChange} value={query} type="submit" />
    </form>
  );
}
