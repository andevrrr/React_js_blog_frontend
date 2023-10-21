import React, { Component } from "react";

import Product from "../../../components/Products/Product";
import ProductEdit from "../../../components/Products/ProductEdit";
import Button from "../../../components/button/Button";
import CategoryForm from "../../../components/CategoryForm/CategoryForm";

import './Products.css';

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
    isAuth: false,
    token: this.props.token,
    categories: [],
    totalCategories: 0,
    categoriesLoading: true,
  };

  componentDidMount() {
    this.checkAuthStatus();
    this.loadProducts();
    this.loadCategories();
  }

  checkAuthStatus = () => {
    if (this.state.token) {
      fetch("http://localhost:3000/check-auth-status", {
        headers: {
          Authorization: "Bearer " + this.props.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ isAuth: data.isAuthenticated }); // Update isAuth state
        })
        .catch((error) => {
          console.error("Error checking authentication status", error);
        });
    } else {
      console.log("User is not logged in");
    }
  };

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
            imagePath: product.image,
          })),
          totalProducts: resData.totalItems,
          productsLoading: false,
        });
      })
      .catch(this.catchError);
  };

  loadCategories = () => {
    fetch("http://localhost:3000/product-categories")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Faild to fetch categories");
        }

        return response.json();
      })
      .then((resData) => {
        this.setState({
          categories: resData.categories.map((category) => ({
            ...category,
          })),
          totalCategories: resData.totalItems,
          categoriesLoading: false,
        });
      })
      .catch(this.catchError);
  };

  catchError = (error) => {
    this.setState({ error: error });
  };

  newProductHandler = () => {
    this.setState({ isEditing: true });
  };

  onStartEditProductHandler = (productId) => {
    this.setState((prevState) => {
      const loadedProduct = {
        ...prevState.products.find((p) => p._id === productId),
      };

      return {
        isEditing: true,
        editProduct: loadedProduct,
      };
    });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editProduct: null });
  };

  finishEditHandler = (productData) => {
    this.setState({
      editLoading: true,
    });
    const formData = new FormData();
    console.log(productData.image);
    formData.append("title", productData.title);
    formData.append("image", productData.image);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("inStock", productData.inStock);
    formData.append("category", productData.category);
    let url = "http://localhost:3000/admin/add-product";
    let method = "POST";
    if (this.state.editProduct) {
      url =
        "http://localhost:3000/admin/edit-product/" +
        this.state.editProduct._id;
      method = "POST";
    }

    fetch(url, {
      method: method,
      body: formData,
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        // const product = {
        //   _id: resData.product._id,
        //   title: resData.product.title,
        //   price: resData.product.price,
        //   description: resData.product.description,
        //   inStock: resData.product.inStock,
        // };
        this.setState((prevState) => {
          return {
            isEditing: false,
            editProduct: null,
            editLoading: false,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isEditing: false,
          editProduct: null,
          editLoading: false,
          error: err,
        });
      });
  };

  deleteProductHandler = (productId) => {
    console.log("Sending CSRF Token:", this.state.csrfToken);
    console.log(productId);
    this.setState({ productsLoading: true });
    fetch("http://localhost:3000/admin/delete-product/" + productId, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a product failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.loadProducts();
        this.setState((prevState) => {
          const updatedProducts = prevState.products.filter(
            (p) => p._id !== productId
          );
          return { products: updatedProducts, productsLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ productsLoading: false });
      });
  };

  createCategoryHandler = (categoryName) => {
    // Make a POST request to your backend API to create a new category
    fetch("http://localhost:3000/admin/add-product-category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.token, // Include your authentication token
      },
      body: JSON.stringify({ name: categoryName }), // Send the category name
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response, you can update your state or perform any actions as needed
        console.log("Category created successfully:", data);
        // You can add the new category to your state if needed
        // Update the state to re-render the component with the new category
        this.setState((prevState) => ({
          categories: [...prevState.categories, data], // Assuming you have a state property called 'categories'
        }));
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        // Handle any error conditions here
      });
  };

  render() {
    return (
      <section className="sectionProduct">
        {this.state.isAuth && (
          <div>
            <ProductEdit
              editing={this.state.isEditing}
              selectedProduct={this.state.editProduct}
              loading={this.state.editLoading}
              onCancelEdit={this.cancelEditHandler}
              onFinishEdit={this.finishEditHandler}
            />
            <Button
              onClick={this.newProductHandler}
            >
              New product
            </Button>
            <CategoryForm onSubmit={this.createCategoryHandler} />
          </div>
        )}
        {this.state.categories.map((category) => (
          <div key={category._id}>
            <h1 id={category._id}>
              {category.name}
            </h1>
            <div>
              {this.state.products
                .filter((product) => product.category[0] === category._id)
                .map((product) => (
                  <Product
                    isAuthenticated={this.state.isAuth}
                    id={product._id}
                    key={product._id}
                    isVisible={product.isVisible}
                    isFeatured={product.isFeatured}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    inStock={product.inStock}
                    image={product.image}
                    date={new Date(product.createdAt).toLocaleDateString(
                      "en-GB"
                    )}
                    onStartEdit={this.onStartEditProductHandler.bind(
                      this,
                      product._id
                    )}
                    onDelete={this.deleteProductHandler.bind(this, product._id)}
                  />
                ))}
            </div>
          </div>
        ))}
      </section>
    );
  }
}

export default Products;
