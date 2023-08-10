import React, { Component } from "react";
import Post from "../../components/posts/post";

class Posts extends Component {
  state = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    status: "",
    postPage: 1,
    postsLoading: true,
    editLoading: false,
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    fetch("http://localhost:3000/posts")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch posts");
        }
        return response.json(); // Return the parsed JSON data
      })
      .then((resData) => {
        this.setState({
          posts: resData.posts.map((post) => ({
            ...post,
          })),
          totalPosts: resData.totalItems,
          postsLoading: false,
        });
      })
      .catch(this.catchError);
  };

  catchError = (error) => {
    this.setState({ error: error });
  };

  onStartEditPostHandler = (postId) => {
    // Handle edit functionality
  };

  deletePostHandler = (postId) => {
    this.setState({ postsLoading: true });
    fetch('http://localhost:3000/admin/delete-product/' + postId, {
      method: 'DELETE'
    })
    .then(res => {
      if(res.status !== 200 && res.status !== 201) {
        throw new Error('Deleting a post failed');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
      this.loadPosts();
      this.setState(prevState => {
        const updatedPosts = prevState.posts.filter(p => p._id !== postId);
        return { posts: updatedPosts, postsLoading: false };
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({ postsLoading: false});
    })
  };

  render() {
    return (
      <div>
        {this.state.posts.map((post) => (
          <Post
            key={post._id}
            title={post.title}
            content={
              post.content.substring(0, 300) +
              (post.content.length > 300 ? "..." : "")
            }
            date={new Date(post.createdAt).toLocaleDateString("en-GB")}
            onStartEdit={this.onStartEditPostHandler.bind(this, post._id)}
            onDelete={this.deletePostHandler.bind(this, post._id)}
          />
        ))}
      </div>
    );
  }
}

export default Posts;
