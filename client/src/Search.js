import React from 'react';
import styles from './Search.module.css'

export default function Search(props) {
    const {onSubmit,onChange,query} = props
    return (
        <form onSubmit={onSubmit} method="POST">
            <input onChange={onChange} placeholder="Search term" value={query}/>
        </form>
    );
}    
