import React, { useState, useEffect } from 'react';

import Posts from '../../components/posts/posts';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/posts') // Replace this URL with the actual backend URL
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div className="App">
      <Posts posts={posts} />
    </div>
  );
}

export default App;
