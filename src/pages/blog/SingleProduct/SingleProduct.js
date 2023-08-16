import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentForm from "../../../components/comments/comments";
import StatusToggle from "../../../components/Status/status";

const SingleProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({
    title: "",
    image: "",
    price: "",
    description: "",
    inStock: "",
    isVisible: false,
    isFeatured: false,
  });

  useEffect(() => {
    fetch("http://localhost:3000/products/" + productId)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      })
      .then((resData) => {
        setProduct({
          title: resData.product.title,
          image: resData.product.image,
          price: resData.product.price,
          description: resData.product.description,
          inStock: resData.product.inStock,
          isVisible: resData.product.isVisible,
          isFeatured: resData.product.isFeatured,
          comments: resData.comments,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  const addCommentHandler = (newComment) => {
    const commentData = { comment: newComment };

    fetch(`http://localhost:3000/products/${productId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed");
        }
        res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <h1>{product.title}</h1>
      <img
        style={{ width: "200px" }}
        src={`http://localhost:3000/${product.image}`}
        alt=""
      />
      <p>Price: {product.price}$</p>
      <p>
        Description: <br /> {product.description}
      </p>
      <p>{product.inStock}</p>
      <div>
        <StatusToggle
          model="products"
          field="isVisible"
          itemId={productId}
          initialStatus={product.isVisible}
        />
        <StatusToggle
          model="products"
          field="isFeatured"
          itemId={productId}
          initialStatus={product.isFeatured}
        />
      </div>
      <h2>Comments:</h2>
      {product.comments && product.comments.length > 0 ? (
        product.comments.map((comment, index) => (
          <p key={comment._id}>
            {index + 1} - {comment.text}
          </p>
        ))
      ) : (
        <p>No comments available.</p>
      )}
      <CommentForm onAddComment={addCommentHandler} />
    </section>
  );
};

export default SingleProduct;
