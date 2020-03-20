import React from 'react';
import styles from './Results.module.css'

function ListItem(props) {
    const { id, full, thumbnail, title, pageUrl, service } = props.item;
    console.log(Buffer.from(full).toString('base64'));

    let encodedUrl = Buffer.from(full).toString('base64')

    return (
        <li>
            <a href={`//127.0.0.1:8080/api/getFile/${encodedUrl}`} download={id}>download</a>
            <a href={pageUrl} target="_blank" >
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
