import React, { Component } from "react";
import Post from "../../components/posts/post";
//import axios from "axios";

import PostEdit from "../../components/posts/postEdit";

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
    csrfToken: "",
  };

  componentDidMount() {
    this.loadPosts();
    // this.fetchCsrfToken();
  }

  // fetchCsrfToken = () => {
  //   axios
  //     .get("http://localhost:3000/get-csrf-token")
  //     .then((response) => {
  //       this.setState({ csrfToken: response.data.csrfToken });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching CSRF token", error);
  //     });
  // };

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
    this.setState((prevState) => {
      const loadedPost = { ...prevState.posts.find((p) => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost,
      };
    });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editPost: null });
  };

  finishEditHandler = (postData) => {
    this.setState({
      editLoading: true,
    });
    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    let url = "http://localhost:3000/admin/add-post";
    let method = "POST";
    if (this.state.editPost) {
      url = "http://localhost:3000/admin/edit-post/" + this.state.editPost._id;
      method = "POST";
    }

    fetch(url, {
      method: method,
      body: formData,
      // headers: {
      //   Authorization: 'Bearer ' + this.props.token
      // }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        const post = {
          _id: resData.post._id,
          title: resData.post.title,
          content: resData.post.content,
        };
        this.setState((prevState) => {
          return {
            isEditing: false,
            editPost: null,
            editLoading: false,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err,
        });
      });
  };

  deletePostHandler = (postId) => {
    console.log("Sending CSRF Token:", this.state.csrfToken);
    console.log(postId);
    this.setState({ postsLoading: true });
    fetch("http://localhost:3000/admin/delete-post/" + postId, {
      method: "POST",
      // headers: {
      //   'X-CSRF-Token': this.state.csrfToken
      // }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a post failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.loadPosts();
        this.setState((prevState) => {
          const updatedPosts = prevState.posts.filter((p) => p._id !== postId);
          return { posts: updatedPosts, postsLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ postsLoading: false });
      });
  };

  render() {
    return (
      <div>
        <PostEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          loading={this.state.editLoading}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        />
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
