import React, { useState, useEffect } from 'react';

import Services from '../../components/services/services';

function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/services') // Replace this URL with the actual backend URL
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="App">
      <Services services={services} />
    </div>
  );
}

export default App;
