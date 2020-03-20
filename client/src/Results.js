import React from 'react';
import styles from './Results.module.css'

function ListItem(props) {
    const {full,thumbnail,title,pageUrl,service} = props.item;
    return (
        <li>
            {/* todo: overlay on hover with link to pixabay / giphny and "save image" link */}
            <a href={pageUrl} target="_blank">
                <img src={thumbnail} alt={`${title} from ${service}`} />
            </a>
        </li>
    )
} 
    
export default function Results(props) {
    let empty = props.results.length === 0;

    return(
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
