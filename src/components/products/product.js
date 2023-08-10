import React from "react";

const Product = (props) => (
  <article>
    <div className="product_item_header">
      <h1>{props.title}</h1>
    </div>
    {/* <div className="product_item_image">
      <img src={`/Users/anton/Desktop/node/NodeJs_blog/images/${props.image}`} alt="" />
    </div> */}
    <div className="product_item_info">
      <h2>{props.price}$</h2>
      <p>{props.description}</p>
      {props.inStock ? <p>In stock</p> : <p>Out of stock</p>}
    </div>
  </article>
);

export default Product;
