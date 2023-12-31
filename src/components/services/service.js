import React from "react";

import Button from "../button/Button";

import StatusToggle from "../Status/status";
import "./Services.css";

const Service = (props) => (
  <article>
    <div className="name_price_box">
      <p>{props.name}</p>
      <p>{props.price}₽</p>
    </div>
    <div className="description_box">
    <p>{props.description}</p>
    </div>
    <div>
      {props.isAuthenticated && (
        <>
          <Button onClick={props.onStartEdit}>Редактировать</Button>
          <Button onClick={props.onDelete}>Удалить</Button>
        </>
      )}
    </div>
    <div>
      {props.isAuthenticated && (
        <>
          <StatusToggle
            model="services"
            field="isVisible"
            itemId={props.id}
            initialStatus={props.isVisible}
          />
          <StatusToggle
            model="services"
            field="isFeatured"
            itemId={props.id}
            initialStatus={props.isFeatured}
          />
        </>
      )}
    </div>
  </article>
);

export default Service;
