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
    return(
        <div className="results">
        <h2>Results for: {props.query}</h2>
        <ul>
            {props.results.map((el,i) => 
                <ListItem item={el} key={i}/>
            )}
        </ul>
        </div>
    ) 
}    
