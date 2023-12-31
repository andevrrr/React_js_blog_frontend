import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentForm from "../../../components/comments/comments";

import './SinglePost.css';

const SinglePost = () => {
  const { postId } = useParams(); // Access the postId parameter

  const [isAuth, setIsAuth] = useState(false);

  const [post, setPost] = useState({
    title: "",
    date: "",
    content: "",
    isFeatured: false,
    isVisible: false,
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // Check authentication status
      fetch("http://localhost:3000/check-auth-status", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIsAuth(data.isAuthenticated); // Update isAuth state
        })
        .catch((error) => {
          console.error("Error checking authentication status", error);
        });
    } else {
      console.log("User is not logged in");
    }
  }, []);

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
    const commentData = { comment: newComment };

    fetch(`http://localhost:3000/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed");
        }
        res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCommentHandler = (commentId) => {
    fetch(
      `http://localhost:3000/admin/delete-comment/post/${postId}/comments/${commentId}`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to delete comment");
        }
        // Remove the deleted comment from the state
        setPost((prevPost) => ({
          ...prevPost,
          comments: prevPost.comments.filter(
            (comment) => comment._id !== commentId
          ),
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="SinglePostSection">
      <h1>{post.title}</h1>
      <p className="createdOn">Created on {post.date}</p>
      <p className="content">{post.content}</p>
      <h2>Comments:</h2>
      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment, index) => (
          <div className="comment" key={comment._id}>
            <p>
              {index + 1} - {comment.text}
            </p>
            {isAuth && (
              <button onClick={() => deleteCommentHandler(comment._id)}>
                Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}

      <CommentForm onAddComment={addCommentHandler} />
    </section>
  );
};

export default SinglePost;
