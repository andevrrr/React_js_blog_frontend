import React from "react";

import Button from '../Button/Button';
import Image from "../Image/Image";

const Product = (props) => (
  <article>
    <div className="product_item_header">
      <h1>{props.title}</h1>
    </div>
    <div className="post__image">
      <Image imageUrl={props.image} contain />
    </div>
    {/* <div className="product_item_image">
      <img src={`/Users/anton/Desktop/node/NodeJs_blog/images/${props.image}`} alt="" />
    </div> */}
    <div className="product_item_info">
      <h2>{props.price}$</h2>
      <p>{props.description}</p>
      {props.inStock ? <p>In stock</p> : <p>Out of stock</p>}
    </div>
    <div>
            <Button link={props.id}>View more</Button>
            <Button onClick={props.onStartEdit}>Edit</Button>
            <Button onClick={props.onDelete}>Delete</Button>
        </div>
  </article>
);

export default Product;
