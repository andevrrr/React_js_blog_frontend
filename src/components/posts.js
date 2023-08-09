import React from "react";

function Posts({ posts }) {
  if (!posts || !Array.isArray(posts)) {
    return <p>No posts available.</p>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  );
}

export default Posts;
