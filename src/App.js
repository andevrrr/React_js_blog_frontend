import React, { Component, Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Services from "./pages/Blog/Services/Services";
import Products from "./pages/Blog/Products/Products";
import Posts from "./pages/Blog/Posts/Posts";
import Header from "./pages/Blog/Header/Header";
import Main from "./pages/Blog/Main";
import SinglePost from "./pages/Blog/SinglePost/SinglePost";
import SingleProduct from "./pages/Blog/SingleProduct/SingleProduct";

import SignUp from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";

import { MenuProvider } from './pages/Blog/MenuContext';

import "./App.css";

class App extends Component {
  state = {
    isAuth: false,
    token: null,
    userId: null,
    authLoading: false,
    error: null,
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      this.props.history.push("/login");
      return;
    }
    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({
      isAuth: true,
      token: token,
      userId: userId,
    });
    this.setAutoLogout(remainingMilliseconds);
  }

  logoutHandler = () => {
    this.setState({
      isAuth: false,
      token: null,
    });

    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
  };

  setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  loginHandler = (event, authData) => {
    event.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Validation failed.");
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Could not authenticate you!");
        }
        
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId,
        });
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  signupHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch("http://localhost:3000/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        name: authData.signupForm.name.value,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log("Error!");
          throw new Error("Creating a user failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.setState({ isAuth: false, authLoading: false });
        this.props.history.replace("/");
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isAuth: false,
          authLoading: false,
          error: err,
        });
      });
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  render() {
    let routes;
    if (this.state.isAuth) {
      routes = (
        <BrowserRouter>
        <MenuProvider>
          <Header isAuth={this.state.isAuth} onLogout={this.logoutHandler} />
          <Routes >
            <Route
              path="/admin"
              exact
              element={
                <Main userId={this.state.userId} token={this.state.token} />
              }
            />
            <Route path="/" element={<Navigate to="/" />} />
            <Route
              path="/admin/services"
              element={
                <Services userId={this.state.userId} token={this.state.token} />
              }
            />
            <Route
              path="/admin/products"
              element={
                <Products userId={this.state.userId} token={this.state.token} />
              }
            />
            <Route
              path="/admin/posts"
              element={
                <Posts userId={this.state.userId} token={this.state.token} />
              }
            />
            <Route
              path="/admin/posts/:postId"
              element={<SinglePost token={this.state.token} />}
            />
            <Route
              path="/admin/products/:productId"
              element={<SingleProduct token={this.state.token} />}
            />
          </Routes>
          </MenuProvider>
        </BrowserRouter>
      );
    } else {
      routes = (
        <BrowserRouter>
        <MenuProvider>
          <Header isAuth={this.state.isAuth} />
          <Routes>
          <Route
              path="/"
              exact
              element={
                <Main />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  onLogin={this.loginHandler}
                  loading={this.state.authLoading}
                />
              }
            />
            <Route
              path="/signup"
              exact
              element={
                <SignUp
                  onLogin={this.signupHandler}
                  loading={this.state.authLoading}
                />
              }
            />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<SinglePost />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
          </Routes>
          </MenuProvider>
        </BrowserRouter>
      );
    }
    return <>{routes}</>;
  }
}

export default App;
