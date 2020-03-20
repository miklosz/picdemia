import React from 'react';
import styles from './Header.module.css';
import logo from './img/logo.png'

export default function Header() {
    return (
        <header className={styles.header}>
            <img src={logo} alt="Picdemia logo" width="75" height="75" />
            <h1>Picdemia</h1>
        </header>
    );
}    