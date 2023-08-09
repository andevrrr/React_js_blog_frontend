import React from "react";

function Services({ services }) {
  if (!services || !Array.isArray(services)) {
    return <p>No services available.</p>;
  }

  return (
    <ul>
      {services.map((service) => (
        <li key={service._id}>
          <h3>{service.name}</h3>
          <p>{service.time}</p>
          <p>{service.price}</p>
        </li>
      ))}
    </ul>
  );
}

export default Services;
