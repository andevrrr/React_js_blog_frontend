import React from 'react';

import Button from '../button/button';

const Post = props => (
    <article>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
        <div>
            <Button link={props.id}>View more</Button>
            <Button onClick={props.onStartEdit}>Edit</Button>
            <Button onClick={props.onDelete}>Delete</Button>
        </div>
    </article>
);

export default Post;