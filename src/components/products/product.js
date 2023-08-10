import React from 'react';

const Product = props => (
    <article>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
    </article>
);

export default Product;