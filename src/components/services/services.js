import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link component for navigation

import "./services.css"

function Services({ isAuthenticated, services }) {
  return (
    <div className="services">
      <h1>Our services</h1>
      {isAuthenticated && <Link to="/admin/add-service">Add service</Link>}
      {services.length > 0 ? (
        <div>
          {services.map((service) => (
            // Render each service
            // Use ternary operators to conditionally render elements
            (service.isVisible || isAuthenticated) && (
              <div key={service._id}>
                <ul className="list_outer">
                  <li>
                    <ul className="list_inner">
                      <li>{service.name}</li>
                      <li>{service.time}</li>
                      <li>{service.price}$</li>
                    </ul>
                  </li>
                </ul>
                {isAuthenticated && (
                  <div className="service_item_actions">
                    <Link to={`/admin/edit-service/${service._id}?edit=true`} className="btn">Edit</Link>
                    <form action={`/admin/delete-service/${service._id}`} method="POST">
                      <input type="hidden" name="_csrf" value="your_csrf_token" />
                      <button type="submit" className="btn">Delete</button>
                    </form>
                    <form action={`/admin/services/status/${service._id}`} method="POST">
                      <input type="hidden" name="_csrf" value="your_csrf_token" />
                      <button type="submit" className="btn">{service.isVisible ? 'Visible' : 'Invisible'}</button>
                    </form>
                    <form action={`/admin/services/featured/${service._id}`} method="POST">
                      <input type="hidden" name="_csrf" value="your_csrf_token" />
                      <button type="submit" className="btn">{service.isFeatured ? 'Featured' : 'Not Featured'}</button>
                    </form>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      ) : (
        <h2>No services found</h2>
      )}
    </div>
  );
}

export default Services;
