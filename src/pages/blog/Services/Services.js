import React, { Component } from "react";

import Service from "../../../components/Services/Service";
import ServiceEdit from "../../../components/Services/ServiceEdit";
import Button from "../../../components/button/Button";
import CategoryForm from "../../../components/CategoryForm/CategoryForm";

import './Services.css';

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
    isAuth: false,
    token: this.props.token,
    categories: [],
    totalCategories: 0,
    categoriesLoading: true,
  };

  componentDidMount() {
    this.checkAuthStatus();
    this.loadServices();
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

  loadCategories = () => {
    fetch("http://localhost:3000/service-categories")
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

  newServiceHandler = () => {
    this.setState({ isEditing: true });
  };

  onStartEditServiceHandler = (serviceId) => {
    this.setState((prevState) => {
      const loadedService = {
        ...prevState.services.find((p) => p._id === serviceId),
      };

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
    formData.append("description", serviceData.description);
    formData.append("time", serviceData.time);
    formData.append("price", serviceData.price);
    formData.append("category", serviceData.category);
    let url = "http://localhost:3000/admin/add-service";
    let method = "POST";
    if (this.state.editService) {
      url =
        "http://localhost:3000/admin/edit-service/" +
        this.state.editService._id;
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
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
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
          const updatedServices = prevState.services.filter(
            (p) => p._id !== serviceId
          );
          return { services: updatedServices, servicesLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ servicesLoading: false });
      });
  };

  createCategoryHandler = (categoryName) => {
    // Make a POST request to your backend API to create a new category
    fetch("http://localhost:3000/admin/add-service-category", {
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
      <section className="sectionServices">
        {this.state.isAuth && (
          <div>
            <ServiceEdit
              editing={this.state.isEditing}
              selectedService={this.state.editService}
              loading={this.state.editLoading}
              onCancelEdit={this.cancelEditHandler}
              onFinishEdit={this.finishEditHandler}
            />
            <Button
              onClick={this.newServiceHandler}
            >
              New service
            </Button>
            <CategoryForm onSubmit={this.createCategoryHandler} />
          </div>
        )}
        <div>
        {this.state.categories.map((category) => (
          <div key={category._id}>
            <h1 className="categoryName" id={category._id}>
              {category.name}
            </h1>
            <div className="divServices">
              {this.state.services
              .filter((service) => service.category[0] === category._id)
              .map((service) => (
                <Service
                  isAuthenticated={this.state.isAuth}
                  key={service._id}
                  id={service._id}
                  isVisible={service.isVisible}
                  isFeatured={service.isFeatured}
                  name={service.name}
                  description={service.description}
                  time={service.time}
                  price={service.price}
                  date={new Date(service.createdAt).toLocaleDateString("en-GB")}
                  onStartEdit={this.onStartEditServiceHandler.bind(
                    this,
                    service._id
                  )}
                  onDelete={this.deleteServiceHandler.bind(this, service._id)}
                />
              ))}
            </div>
          </div>
        ))}
        </div>
      </section>
    );
  }
}

export default Services;
