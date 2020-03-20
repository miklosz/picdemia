import React from 'react';
import styles from './Hints.module.css'

export default function Hints(props) {
    return(
        <div className={styles.hints}>
            <h3>Latest searches:</h3>
            
                {props.hints.map(el => 
                    <button className={styles.button} onClick={() => props.onClick(el)} key={el}>{el}</button>
                )}
            
        </div>
    ) 
} 