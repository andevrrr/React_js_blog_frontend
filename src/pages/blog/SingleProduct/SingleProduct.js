import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CommentForm from "../../../components/comments/comments";

const SingleProduct = () => {
  const { productId } = useParams();

  const [isAuth, setIsAuth] = useState(false);

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
    // Check authentication status
    fetch("http://localhost:3000/check-auth-status", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsAuth(data.isAuthenticated); // Update isAuth state
      })
      .catch((error) => {
        console.error("Error checking authentication status", error);
      });
  }, []);

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

  const deleteCommentHandler = (commentId) => {

      fetch(
        `http://localhost:3000/admin/delete-comment/product/${productId}/comments/${commentId}`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("Failed to delete comment");
          }
          // Remove the deleted comment from the state
          setProduct((prevProduct) => ({
            ...prevProduct,
            comments: prevProduct.comments.filter(
              (comment) => comment._id !== commentId
            ),
          }));
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
      <h2>Comments:</h2>
      {product.comments && product.comments.length > 0 ? (
        product.comments.map((comment, index) => (
          <>
            <p key={comment._id}>
              {index + 1} - {comment.text}
            </p>
            {isAuth && (
              <button onClick={() => deleteCommentHandler(comment._id)}>
                Delete
              </button>
            )}
          </>
        ))
      ) : (
        <p>No comments available.</p>
      )}
      <CommentForm onAddComment={addCommentHandler} />
    </section>
  );
};

export default SingleProduct;
