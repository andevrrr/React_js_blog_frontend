import React from 'react';
import "./posts.css"

function Posts({ isAuthenticated, posts }) {
  return (
    <div className="container">
      <h1>Simple Blog</h1>
      {isAuthenticated && <a href="/admin/add-post">Add post</a>}
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => (
            ((post.isVisible && !isAuthenticated) || isAuthenticated) && (
              <div className="post" key={post._id}>
                <h2>{post.title}</h2>
                <p>
                  {post.content.substring(0, 300)}
                  {post.content.length > 300 ? '...' : ''}
                </p>
                <a href={`/posts/${post._id}`}>Read more</a>
                <div className="comments">
                  <h3>Comments</h3>
                  <ul className="comment-list">
                    {post.comments.map((comment) => (
                      <li key={comment._id}>
                        {comment.text}
                        <form action={`/admin/delete-comment/post/${post._id}/comments/${comment._id}`} method="POST">
                          <input type="hidden" name="_csrf" value="{csrfToken}" />
                          <button type="submit" className="btn">Delete</button>
                        </form>
                      </li>
                    ))}
                  </ul>
                </div>
                {isAuthenticated && (
                  <div className="post_item_actions">
                    <a href={`/admin/edit-post/${post._id}?edit=true`} className="btn">Edit</a>
                    <form action={`/admin/delete-post/${post._id}`} method="POST">
                      <input type="hidden" name="_csrf" value="{csrfToken}" />
                      <button type="submit" className="btn">Delete</button>
                    </form>
                    <form action={`/admin/posts/status/${post._id}`} method="POST">
                      <input type="hidden" name="_csrf" value="{csrfToken}" />
                      <button type="submit" className="btn">
                        {post.isVisible ? 'Visible' : 'Invisible'}
                      </button>
                    </form>
                    <form action={`/admin/posts/featured/${post._id}`} method="POST">
                      <input type="hidden" name="_csrf" value="{csrfToken}" />
                      <button type="submit" className="btn">
                        {post.isFeatured ? 'Featured' : 'Not Featured'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )
          ))
        ) : (
          <h2>No posts found</h2>
        )}
      </div>
    </div>
  );
}

export default Posts;
