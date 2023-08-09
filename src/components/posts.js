import React from "react";

function Services({ posts }) {
  if (!posts || !Array.isArray(posts)) {
    return <p>No services available.</p>;
  }

  return (
    <ul>
      {posts.map((service) => (
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
