import React from "react";

import Button from "../button/Button";
import StatusToggle from "../Status/status";

import './Posts.css'

const Post = (props) => (
  <article className="articlePost">
    <h2>{props.title}</h2>
    <p>{props.content}</p>
    <div>
      <Button link={props.id}>Узнать больше</Button>
      {props.isAuthenticated && (
        <>
          <Button onClick={props.onStartEdit}>Редактировать</Button>
          <Button onClick={props.onDelete}>Удалить</Button>
        </>
      )}
    </div>
    {props.isAuthenticated && (
      <div>
        <StatusToggle
          model="posts"
          field="isVisible"
          itemId={props.id}
          initialStatus={props.isVisible}
        />
        <StatusToggle
          model="posts"
          field="isFeatured"
          itemId={props.id}
          initialStatus={props.isFeatured}
        />
      </div>
    )}
  </article>
);

export default Post;
