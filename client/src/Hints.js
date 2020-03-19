import React from 'react';

export default function Hints(props) {
    return(
        <div className="hints">
            <ul>
                {props.hints.map(el => 
                    <button onClick={() => props.onClick(el)} key={el}>{el}</button>
                )}
            </ul>
        </div>
    ) 
} 