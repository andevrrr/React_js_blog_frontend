import React from 'react';

import './Image.css';



const image = props => (
  <div
    className="image"
    style={{
      backgroundImage: `url('http://localhost:3000/${props.image}')`,
      backgroundSize: props.contain ? 'contain' : 'cover',
      backgroundPosition: props.left ? 'left' : 'center'
    }}
  />
);

export default image;
