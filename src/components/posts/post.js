import React from 'react';

const Post = props => (
    <article>
        <h2>{props.title}</h2>
        <p>{props.content}</p>
    </article>
);

export default Post;