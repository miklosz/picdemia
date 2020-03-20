import React from 'react';
import styles from './Results.module.css'

function ListItem(props) {
    const { thumbnail, title, pageUrl, service } = props.item;
    return (
        <li>
            <a href={pageUrl} target="_blank" >
                <img src={thumbnail} alt={`${title} from ${service}`} />
                <h4 className={styles.detailsTop}>{title}</h4>
            </a>
        </li>
    )
}

export default function Results(props) {
    let empty = props.results.length === 0;

    return (
        <div className={styles.results}>
            <h2 className={styles.empty}>{empty && 'No '} results for: {props.query}</h2>
            <ul className={styles.ul}>
                {props.results.map((el) =>
                    <ListItem item={el} key={el.id} />
                )}
            </ul>
        </div>
    )
}    
