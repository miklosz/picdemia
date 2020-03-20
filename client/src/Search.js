import React from 'react';
import styles from './Search.module.css'

export default function Search(props) {
    const {onSubmit, onChange, query} = props
    return (
        <form onSubmit={onSubmit} method="POST">
            <input onChange={onChange} placeholder="Search for images" value={query}/>
            <button className={styles.button} onClick={onChange} value={query}></button>
        </form>
    );
}    
