import React, { Component } from "react";

import Product from "../../components/products/product";

class Products extends Component {
  state = {
    isEditing: false,
    products: [],
    totalProducts: 0,
    editProduct: null,
    status: "",
    productPage: 1,
    productsLoading: true,
    editLoading: false,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = () => {
    fetch("http://localhost:3000/products")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((resData) => {
        this.setState({
          products: resData.products.map((product) => ({
            ...product,
          })),
          totalProducts: resData.totalItems,
          productsLoading: false,
        });
      })
      .catch(this.catchError);
  };

  catchError = (error) => {
    this.setState({error: error});
  }

  render() {
    return (
        <div>
            {this.state.products.map((product) => (
                <Product key={product._id} title={product.title} description={product.description} />
            ))}
        </div>
    );
  }
}

export default Products;
