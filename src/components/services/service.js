import React from 'react';

import Button from '../Button/Button';

const Service = props => (
    <article>
        <h2>{props.name}</h2>
        <p>{props.time}</p>
        <p>{props.price}</p>
        <div>
            <Button onClick={props.onStartEdit}>Edit</Button>
            <Button onClick={props.onDelete}>Delete</Button>
        </div>
    </article>
);

export default Service;