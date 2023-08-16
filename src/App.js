import React, { Component, Fragment } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    error: null
  }

  render() {
    return (
      <>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<SinglePost />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
