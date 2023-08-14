import React, { Component } from "react";

import Service from "../../components/Services/Service";
import ServiceEdit from "../../components/Services/ServiceEdit";
import Button from "../../components/Button/Button";

class Services extends Component {
  state = {
    isEditing: false,
    services: [],
    totalServices: 0,
    editService: null,
    status: "",
    servicePage: 1,
    servicesLoading: true,
    editLoading: false,
  };

  componentDidMount() {
    this.loadServices();
  }

  loadServices = () => {
    fetch("http://localhost:3000/services")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Faild to fetch services");
        }

        return response.json();
      })
      .then((resData) => {
        this.setState({
          services: resData.services.map((service) => ({
            ...service,
          })),
          totalServices: resData.totalItems,
          servicesLoading: false,
        });
      })
      .catch(this.catchError);
  };

  catchError = (error) => {
    this.setState({ error: error });
  };

  newServiceHandler = () => {
    this.setState({ isEditing: true });
  };

  onStartEditServiceHandler = (serviceId) => {
    this.setState((prevState) => {
      const loadedService = { ...prevState.services.find((p) => p._id === serviceId) };

      return {
        isEditing: true,
        editService: loadedService,
      };
    });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editService: null });
  };

  finishEditHandler = (serviceData) => {
    this.setState({
      editLoading: true,
    });
    const formData = new FormData();
    formData.append("name", serviceData.name);
    formData.append("time", serviceData.time);
    formData.append("price", serviceData.price);
    let url = "http://localhost:3000/admin/add-service";
    let method = "POST";
    if (this.state.editService) {
      url = "http://localhost:3000/admin/edit-service/" + this.state.editService._id;
      method = "POST";
    }

    fetch(url, {
      method: method,
      body: formData,
      // headers: {
      //   Authorization: 'Bearer ' + this.props.token
      // }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a service failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        // const service = {
        //   _id: resData.service._id,
        //   name: resData.service.name,
        //   time: resData.service.time,
        //   price: resData.service.price,
        // };
        this.setState((prevState) => {
          return {
            isEditing: false,
            editService: null,
            editLoading: false,
          };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          isEditing: false,
          editService: null,
          editLoading: false,
          error: err,
        });
      });
  };

  deleteServiceHandler = (serviceId) => {
    console.log("Sending CSRF Token:", this.state.csrfToken);
    console.log(serviceId);
    this.setState({ servicesLoading: true });
    fetch("http://localhost:3000/admin/delete-service/" + serviceId, {
      method: "POST",
      // headers: {
      //   'X-CSRF-Token': this.state.csrfToken
      // }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a service failed");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        this.loadServices();
        this.setState((prevState) => {
          const updatedServices = prevState.services.filter((p) => p._id !== serviceId);
          return { services: updatedServices, servicesLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ servicesLoading: false });
      });
  };

  render() {
    return (
      <div>
        <ServiceEdit
          editing={this.state.isEditing}
          selectedService={this.state.editService}
          loading={this.state.editLoading}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        />
        <Button mode="raised" design="accent" onClick={this.newServiceHandler}>
          New service
        </Button>
        {this.state.services.map((service) => (
          <Service
            key={service._id}
            id={service._id}
            name={service.name}
            time={service.time}
            price={service.price}
            date={new Date(service.createdAt).toLocaleDateString("en-GB")}
            onStartEdit={this.onStartEditServiceHandler.bind(this, service._id)}
            onDelete={this.deleteServiceHandler.bind(this, service._id)}
          />
        ))}
      </div>
    );
  }
}

export default Services;
