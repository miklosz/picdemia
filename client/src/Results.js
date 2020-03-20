import React from 'react';
import styles from './Results.module.css'

function ListItem(props) {
    const { full, thumbnail, title, pageUrl, service } = props.item;
    console.log(full);
    return (
        <li>
            <a href={pageUrl} target="_blank" download={service}>
                <img src={thumbnail} alt={`${title} from ${service}`} />
                <h4 className={styles.detailsTop}>{title}</h4>
                {/* <div className={styles.detailsBottom}>
                    add link to download
                </div> */}
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
                {props.results.map((el, i) =>
                    <ListItem item={el} key={i} />
                )}
            </ul>
        </div>
    )
}    
