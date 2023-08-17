import React from 'react';

import Button from '../Button/Button';

import StatusToggle from '../Status/status';

const Service = (props) => (
    <article>
      <h2>{props.name}</h2>
      <p>{props.time}h</p>
      <p>{props.price}$</p>
      <div>
        {props.isAuthenticated && (
          <>
            <Button onClick={props.onStartEdit}>Edit</Button>
            <Button onClick={props.onDelete}>Delete</Button>
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