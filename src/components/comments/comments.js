import React, { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    if (comment.trim() !== '' && name.trim() !== '' && email.trim() !== '') {
      onAddComment({ name, email, comment });
      setName("");
      setEmail("");
      setComment("");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
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
