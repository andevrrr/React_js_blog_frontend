import React from "react";

import Button from "../Button/Button";
import Image from "../Image/Image";
import "./Products.css";

import StatusToggle from '../Status/status';

const Product = (props) => (
  <article>
    <div className="product_item_header">
      <h1>{props.title}</h1>
    </div>
    <div className="post__image">
      <img src={`http://localhost:3000/${props.image}`} alt="Image" />
      {/* <Image image={props.image} contain /> */}
    </div>
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
    <div>
        <StatusToggle
          model="products"
          field="isVisible"
          itemId={props.id}
          initialStatus={props.isVisible}
        />
        <StatusToggle
          model="products"
          field="isFeatured"
          itemId={props.id}
          initialStatus={props.isFeatured}
        />
      </div>
  </article>
);

export default Product;
