import React from "react";

function Products({ products }) {
  if (!products || !Array.isArray(products)) {
    return <p>No products available.</p>;
  }

  return (
    <ul>
      {products.map((product) => (
        <li key={product._id}>
          <h3>{product.title}</h3>
          <p>{product.price}</p>
          <p>{product.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default Products;
