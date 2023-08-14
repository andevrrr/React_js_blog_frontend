import React, { Component, Fragment } from "react";

import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";

const PRODUCT_FORM = {
  title: {
    value: "",
    valid: false,
    touched: false,
    // validators: [required, length({ min: 5 })],
  },
  price: {
    value: "",
    valid: false,
    touched: false,
    // validators: [required, length({ min: 5 })],
  },
  description: {
    value: "",
    valid: false,
    touched: false,
    // validators: [required, length({ min: 5 })],
  },
  inStock: {
    value: true,
    valid: false,
    touched: false,
    // validators: [required, length({ min: 5 })],
  },
};

class ProductEdit extends Component {
  state = {
    productForm: PRODUCT_FORM,
    formIsValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedProduct !== this.props.selectedProduct
    ) {
      const productForm = {
        title: {
          ...prevState.productForm.title,
          value: this.props.selectedProduct.title,
          valid: true,
        },
        price: {
          ...prevState.productForm.price,
          value: this.props.selectedProduct.price,
          valid: true,
        },
        description: {
          ...prevState.productForm.description,
          value: this.props.selectedProduct.description,
          valid: true,
        },
        inStock: {
          ...prevState.productForm.inStock,
          value: this.props.selectedProduct.inStock,
          valid: true,
        },
      };
      this.setState({ productForm: productForm, formIsValid: true });
    }
  }

  productInputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;
      //   for (const validator of prevState.productForm[input].validators) {
      //     isValid = isValid && validator(value);
      //   }
      const updatedForm = {
        ...prevState.productForm,
        [input]: {
          ...prevState.productForm[input],
          valid: isValid,
          value: value,
        },
      };

      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        productForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        productForm: {
          ...prevState.productForm,
          [input]: {
            ...prevState.productForm[input],
            touched: true,
          },
        },
      };
    });
  };

  cancelProductChangeHandler = () => {
    this.setState({
      productForm: PRODUCT_FORM,
      formIsValid: false,
    });
    this.props.onCancelEdit();
  };

  acceptProductChangeHandler = () => {
    const product = {
      title: this.state.productForm.title.value,
      price: this.state.productForm.price.value,
      description: this.state.productForm.description.value,
      inStock: this.state.productForm.inStock.value,
    };
    this.props.onFinishEdit(product);
    this.setState({
      productForm: PRODUCT_FORM,
      formIsValid: false,
    });
  };

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelProductChangeHandler} />
        <Modal
          title="New Product"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelProductChangeHandler}
          onAcceptModal={this.acceptProductChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
            <Input
              id="title"
              label="Title"
              control="input"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "title")}
              valid={this.state.productForm["title"].valid}
              touched={this.state.productForm["title"].touched}
              value={this.state.productForm["title"].value}
            />
            <Input
              id="price"
              label="Price"
              control="input"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "price")}
              valid={this.state.productForm["price"].valid}
              touched={this.state.productForm["price"].touched}
              value={this.state.productForm["price"].value}
            />
            <Input
              id="description"
              label="Description"
              control="textarea"
              rows="5"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "description")}
              valid={this.state.productForm["description"].valid}
              touched={this.state.productForm["description"].touched}
              value={this.state.productForm["description"].value}
            />
            <Input
              id="inStock"
              label="In Stock"
              control="input"
              type="checkbox"
              onChange={this.productInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "inStock")}
              valid={this.state.productForm["inStock"].valid}
              touched={this.state.productForm["inStock"].touched}
              value={this.state.productForm["inStock"].value}
            />
          </form>
        </Modal>
      </Fragment>
    ) : null;
  }
}

export default ProductEdit;
