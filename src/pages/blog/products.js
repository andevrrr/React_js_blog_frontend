import React, { useState, useEffect } from 'react';

import Products from '../../components/products';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products') // Replace this URL with the actual backend URL
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="App">
      <Products products={products} />
    </div>
  );
}

export default App;
