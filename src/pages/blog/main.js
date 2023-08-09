import React, { useState, useEffect } from 'react';

import Posts from '../../components/posts';

function App() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/') // Replace this URL with the actual backend URL
//       .then(response => response.json())
//       .then(data => setPosts(data))
//       .catch(error => console.error('Error fetching posts:', error));
//   }, []);

  return (
    <div className="App">
      <p>Hi, its the main page</p>
    </div>
  );
}

export default App;
