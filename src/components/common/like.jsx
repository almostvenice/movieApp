import React from 'react';

const Like = (props) => {
    let classes = "fa fa-heart"; //active class
    if (!props.liked) classes += "-o"; //if props.liked = false, add "-o" to the classes
    return (
        <i 
            onClick={props.onClick}          //Heart props
            style={{cursor: 'pointer'}} 
            className={classes} 
            aria-hidden="true">
        </i>
    );
}

 
export default Like;