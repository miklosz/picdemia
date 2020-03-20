import React from 'react';
import styles from './Results.module.css'
import Loader from './Loader'

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

function ShowMore(props) {
    return (
        <button className={styles.more} onClick={props.more}>Show more</button>
    )
}

function ResultsList(props) {
    const { showCount, query, results, more, total } = props.props;

    return (
        <div className={styles.results}>
            <h2 className={styles[showCount]}>{showCount} pictures for: <b>{query}</b> found</h2>
            {showCount > 0 && <ul className={styles.ul}>
                {results.map((el) =>
                    <ListItem item={el} key={el.id} />
                )}
            </ul>}
            {(results.length < total) && <ShowMore more={more} />}
        </div>
    )
}

export default function Results(props) {
    let showCount = props.total > 0 ? props.total : 'no';
    return (props.status === 'loading') ? <Loader /> : <ResultsList props={{ ...props, showCount }} />
}