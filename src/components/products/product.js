import React from "react";

import Button from "../button/Button";
import "./Products.css";

import StatusToggle from "../Status/status";

const Product = (props) => (
  <article className="article">
    <div className="product_item_header">
      <h1>{props.title}</h1>
    </div>
    <div className="post__image">
      <img src={`http://localhost:3000/${props.image}`} alt="Image" />
    </div>
    <div className="product_item_info">
      <h2 className="price">{props.price}$</h2>
      <p>{props.description}</p>
      {props.inStock ? <p>В наличии</p> : <p>Нет в наличии</p>}
    </div>
    <div className="button_div">
      <Button link={props.id}>о продукте</Button>
      {props.isAuthenticated && (
          <>
            <Button onClick={props.onStartEdit}>Редактировать</Button>
            <Button onClick={props.onDelete}>Удалить</Button>
          </>
        )}
    </div>
    {props.isAuthenticated && (
      <div className="status">
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
    )}
  </article>
);

export default Product;
