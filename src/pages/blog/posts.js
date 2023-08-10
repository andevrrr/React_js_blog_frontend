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

  render() {
    return (
      <div>
        {this.state.posts.map((post) => (
          <Post key={post._id} title={post.title} content={post.content.substring(0, 300) + (post.content.length > 300 ? '...' : '')} />
        ))}
      </div>
    );
  }
}

export default Posts;
