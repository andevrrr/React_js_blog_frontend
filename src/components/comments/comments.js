import React, { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
  const [comment, setComment] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    if (comment.trim() !== '') {
      onAddComment(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <textarea
        rows="4"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
