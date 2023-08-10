import React from 'react';

const Service = props => (
    <article>
        <h2>{props.name}</h2>
        <p>{props.price}</p>
    </article>
);

export default Service;