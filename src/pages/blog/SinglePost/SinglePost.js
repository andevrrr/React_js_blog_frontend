import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentForm from "../../../components/comments/comments";

const SinglePost = () => {
  const { postId } = useParams(); // Access the postId parameter

  const [post, setPost] = useState({
    title: "",
    date: "",
    content: "",
    isFeatured: false,
    isVisible: false
  });

  useEffect(() => {
    fetch("http://localhost:3000/posts/" + postId)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((resData) => {
        setPost({
          title: resData.post.title,
          date: new Date(resData.post.createdAt).toLocaleDateString("en-GB"),
          content: resData.post.content,
          isFeatured: resData.post.isFeatured,
          isVisible: resData.post.isVisible,
          comments: resData.comments,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  const addCommentHandler = (newComment) => {
    const commentData = {comment: newComment};

    fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
    })
    .then(res => {
        if (res.status !== 200){
            throw new Error("Failed");
        }
        res.json();
    })
    .catch(err => {
        console.log(err);
    })
  };

  return (
    <section>
      <h1>{post.title}</h1>
      <h2>Created on {post.date}</h2>
      <p>{post.content}</p>
      <h2>Comments:</h2>
      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment, index) => (
          <p key={comment._id}>{index+1} - {comment.text}</p>
        ))
      ) : (
        <p>No comments available.</p>
      )}
      <CommentForm onAddComment={addCommentHandler} />
    </section>
  );
};

export default SinglePost;
