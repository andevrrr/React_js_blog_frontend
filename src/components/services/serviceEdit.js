import React, { Component, Fragment } from "react";

import Backdrop from "../Backdrop/Backdrop";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";

const SERVICE_FORM = {
  name: {
    value: "",
    valid: false,
    touched: false,
    // validators: [required, length({ min: 5 })],
  },
  time: {
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
};

class ServiceEdit extends Component {
  state = {
    serviceForm: SERVICE_FORM,
    formIsValid: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.editing &&
      prevProps.editing !== this.props.editing &&
      prevProps.selectedService !== this.props.selectedService
    ) {
      const serviceForm = {
        name: {
          ...prevState.serviceForm.name,
          value: this.props.selectedService.name,
          valid: true,
        },
        time: {
          ...prevState.serviceForm.time,
          value: this.props.selectedService.time,
          valid: true,
        },
        price: {
            ...prevState.serviceForm.price,
            value: this.props.selectedService.price,
            valid: true,
          },
      };
      this.setState({ serviceForm: serviceForm, formIsValid: true });
    }
  }

  serviceInputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;
      //   for (const validator of prevState.serviceForm[input].validators) {
      //     isValid = isValid && validator(value);
      //   }
      const updatedForm = {
        ...prevState.serviceForm,
        [input]: {
          ...prevState.serviceForm[input],
          valid: isValid,
          value: value
        },
      };

      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        serviceForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        serviceForm: {
          ...prevState.serviceForm,
          [input]: {
            ...prevState.serviceForm[input],
            touched: true,
          },
        },
      };
    });
  };

  cancelServiceChangeHandler = () => {
    this.setState({
      serviceForm: SERVICE_FORM,
      formIsValid: false,
    });
    this.props.onCancelEdit();
  };

  acceptServiceChangeHandler = () => {
    const service = {
      name: this.state.serviceForm.name.value,
      time: this.state.serviceForm.time.value,
      price: this.state.serviceForm.price.value,
    };
    this.props.onFinishEdit(service);
    this.setState({
      serviceForm: SERVICE_FORM,
      formIsValid: false,
    });
  };

  render() {
    return this.props.editing ? (
      <Fragment>
        <Backdrop onClick={this.cancelServiceChangeHandler} />
        <Modal
          title="New Service"
          acceptEnabled={this.state.formIsValid}
          onCancelModal={this.cancelServiceChangeHandler}
          onAcceptModal={this.acceptServiceChangeHandler}
          isLoading={this.props.loading}
        >
          <form>
            <Input
              id="name"
              label="Name"
              control="input"
              onChange={this.serviceInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "name")}
              valid={this.state.serviceForm["name"].valid}
              touched={this.state.serviceForm["name"].touched}
              value={this.state.serviceForm["name"].value}
            />
            <Input
              id="time"
              label="Time"
              control="input"
              onChange={this.serviceInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "time")}
              valid={this.state.serviceForm["time"].valid}
              touched={this.state.serviceForm["time"].touched}
              value={this.state.serviceForm["time"].value}
            />
            <Input
              id="price"
              label="Price"
              control="input"
              onChange={this.serviceInputChangeHandler}
              onBlur={this.inputBlurHandler.bind(this, "price")}
              valid={this.state.serviceForm["price"].valid}
              touched={this.state.serviceForm["price"].touched}
              value={this.state.serviceForm["price"].value}
            />
          </form>
        </Modal>
      </Fragment>
    ) : null;
  }
}

export default ServiceEdit;
