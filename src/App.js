import React, { Component, Fragment } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Services from "./pages/Blog/Services";
import Products from "./pages/Blog/Products";
import Posts from "./pages/Blog/Posts";
import Header from "./pages/Blog/Header/Header";
import Main from "./pages/Blog/Main";
import SinglePost from "./pages/Blog/SinglePost/SinglePost";
import SingleProduct from "./pages/Blog/SingleProduct/SingleProduct";

import SignUp from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";

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
          <Header isAuth={this.state.isAuth} onLogout={this.logoutHandler} />
          <main>
          <Routes>
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
          </main>
        </BrowserRouter>
      );
    } else {
      routes = (
        <BrowserRouter>
          <Header isAuth={this.state.isAuth} />
          <main>
          <Routes className="main">
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
          </main>
        </BrowserRouter>
      );
    }
    return <>{routes}<>The code you've provided should work for showing and hiding the header as the user scrolls. Here's a quick recap of how it works:

    The header starts in the hidden state (transform: translateY(-100%)).
    
    The useEffect hook is used to add a scroll event listener to the window. When the user scrolls, the handleScroll function is called.
    
    The handleScroll function checks the window.scrollY value (the vertical scroll position). If the scroll position is greater than 10 pixels, it sets the showHeader state to "visible," which will trigger the CSS rule .header.visible that changes the transform property to transform: translateY(0).
    
    If the user scrolls back to the top (scroll position is less than or equal to 10 pixels), it hides the header again.
    
    The CSS rules define the transition and styling for the header when it's in the "visible" state.
    
    The header component uses the showHeader state to determine whether to apply the "visible" class to the header element.
    
    This setup should show the header after the user has scrolled down 10 pixels and hide it when they scroll back up. Make sure the Header component is correctly integrated into your application, and the CSS styles are loaded.
    
    If you encounter any issues or have further questions, please let me know!The code you've provided should work for showing and hiding the header as the user scrolls. Here's a quick recap of how it works:

The header starts in the hidden state (transform: translateY(-100%)).

The useEffect hook is used to add a scroll event listener to the window. When the user scrolls, the handleScroll function is called.

The handleScroll function checks the window.scrollY value (the vertical scroll position). If the scroll position is greater than 10 pixels, it sets the showHeader state to "visible," which will trigger the CSS rule .header.visible that changes the transform property to transform: translateY(0).

If the user scrolls back to the top (scroll position is less than or equal to 10 pixels), it hides the header again.

The CSS rules define the transition and styling for the header when it's in the "visible" state.

The header component uses the showHeader state to determine whether to apply the "visible" class to the header element.

This setup should show the header after the user has scrolled down 10 pixels and hide it when they scroll back up. Make sure the Header component is correctly integrated into your application, and the CSS styles are loaded.

If you encounter any issues or have further questions, please let me know!The code you've provided should work for showing and hiding the header as the user scrolls. Here's a quick recap of how it works:

The header starts in the hidden state (transform: translateY(-100%)).

The useEffect hook is used to add a scroll event listener to the window. When the user scrolls, the handleScroll function is called.

The handleScroll function checks the window.scrollY value (the vertical scroll position). If the scroll position is greater than 10 pixels, it sets the showHeader state to "visible," which will trigger the CSS rule .header.visible that changes the transform property to transform: translateY(0).

If the user scrolls back to the top (scroll position is less than or equal to 10 pixels), it hides the header again.

The CSS rules define the transition and styling for the header when it's in the "visible" state.

The header component uses the showHeader state to determine whether to apply the "visible" class to the header element.

This setup should show the header after the user has scrolled down 10 pixels and hide it when they scroll back up. Make sure the Header component is correctly integrated into your application, and the CSS styles are loaded.

If you encounter any issues or have further questions, please let me know!</></>;
  }
}

export default App;
