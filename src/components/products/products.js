import React from 'react';
import "./products.css"

function Products({ isAuthenticated, products }) {
  return (
    <div className="products">
      <h1>Our products</h1>
      {isAuthenticated && <a href="/admin/add-product">Add product</a>}
      {products.length > 0 ? (
        <div className="grid">
          {products.map((product) => (
            <article className="product_item" key={product._id}>
              <header className="product_item_header">
                <h1>{product.title}</h1>
              </header>
              <div className="product_item_image">
                <img src={`/${product.image}`} alt="" />
              </div>
              <div className="product_item_info">
                <h2>{product.price}$</h2>
                <p>{product.description}</p>
                <p>{product.inStock ? 'In stock' : 'Out of stock'}</p>
              </div>
              <div className="product_item_actions">
                <div>
                  <a href={`/details/${product._id}`} className="btn">
                    Details
                  </a>
                </div>
              </div>
              {isAuthenticated && (
                <div className="product_item_actions">
                  <a
                    href={`/admin/edit-product/${product._id}?edit=true`}
                    className="btn"
                  >
                    Edit
                  </a>
                  <form action={`/admin/delete-product/${product._id}`} method="POST">
                    <input type="hidden" name="_csrf" value="{csrfToken}" />
                    <button type="submit" className="btn">
                      Delete
                    </button>
                  </form>
                  <form action={`/admin/products/status/${product._id}`} method="POST">
                    <input type="hidden" name="_csrf" value="{csrfToken}" />
                    <button type="submit" className="btn">
                      {product.isVisible ? 'Visible' : 'Invisible'}
                    </button>
                  </form>
                  <form action={`/admin/products/featured/${product._id}`} method="POST">
                    <input type="hidden" name="_csrf" value="{csrfToken}" />
                    <button type="submit" className="btn">
                      {product.isFeatured ? 'Featured' : 'Not Featured'}
                    </button>
                  </form>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <h2>No products found</h2>
      )}
    </div>
  );
}

export default Products;
