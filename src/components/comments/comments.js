import React, { useState } from 'react';
import { required, emailAddress } from '../../util/validators';

const CommentForm = ({ onAddComment }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const nameIsValid = required(name);
  const emailIsValid = emailAddress(email);
  const commentIsValid = required(comment);

  const submitHandler = (event) => {
    event.preventDefault();

    if (nameIsValid && emailIsValid && commentIsValid) {
      onAddComment({ name, email, comment });
      setName("");
      setEmail("");
      setComment("");
    } else {
      if (!emailIsValid) {
        setEmailError("Please enter a valid email address.");
      } 
      if (!nameIsValid) {
        setNameError("Please enter your name.");
      }
    }
  };

  return (
    <form onSubmit={submitHandler} noValidate>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      {emailError && <p style={{ color: 'red' }}>{nameError}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ borderColor: emailError ? 'red' : 'black' }}
      />
      {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
      <textarea
        rows="4"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        required
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
