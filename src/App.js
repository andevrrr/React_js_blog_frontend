import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Services from "./pages/Blog/Services";
import Products from "./pages/Blog/Products";
import Posts from "./pages/Blog/Posts";
import Header from "./pages/Blog/Header/Header";
import Main from "./pages/Blog/Main";
import SinglePost from "./pages/Blog/SinglePost/SinglePost";
import SingleProduct from "./pages/Blog/SingleProduct/SingleProduct";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
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

export default App;
