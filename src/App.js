import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Services from "./pages/blog/services";
import Products from "./pages/blog/products";
import Posts from "./pages/blog/posts";
import Header from "./pages/blog/header/header";
import Main from "./pages/blog/main";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
