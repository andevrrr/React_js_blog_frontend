import React, { Component } from 'react';

import Service from '../../components/services/service';

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

  componentDidMount(){
    this.loadServices();
  }

  loadServices = () => {
    fetch("http://localhost:3000/services")
    .then(response => {
      if (response.status !== 200) {
        throw new Error("Faild to fetch services")
      }

      return response.json();
    })
    .then(resData => {
      this.setState({
        services: resData.services.map(service => ({
          ...service
        })),
        totalServices: resData.totalItems,
        servicesLoading: false
      })
    })
    .catch(this.catchError);
  }

  catchError = (error) => {
    this.setState({error: error})
  }

  render() {
    return (
      <div>
        {this.state.services.map(service => (
          <Service key={service._id} name={service.name} price={service.price} />
        ))}
      </div>
    )
  }

}

export default Services;
