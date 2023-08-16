import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const SinglePost = () => {
  const { postId } = useParams(); // Access the postId parameter

  const [post, setPost] = useState({
    title: "",
    date: "",
    content: "",
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
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);

  return (
    <section>
      <h1>{post.title}</h1>
      <h2>Created on {post.date}</h2>
      <p>{post.content}</p>
    </section>
  );
};

export default SinglePost;
