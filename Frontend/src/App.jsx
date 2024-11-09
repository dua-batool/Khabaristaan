// src/App.jsx
import React, { useEffect, useState } from 'react';
import { fetchDataFromAPI } from './services/chromaApi';

function App() {
  const [message, setMessage] = useState('');
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    // Fetch data from the root endpoint
    fetchDataFromAPI('/')
      .then(response => setMessage(response))
      .catch(error => console.error("Error fetching root message:", error));

    // Fetch data from the /api/test endpoint
    fetchDataFromAPI('/api/test')
      .then(response => setTestMessage(response))
      .catch(error => console.error("Error fetching test message:", error));
  }, []);

  return (
    <div>
      <h1>Chroma API Frontend</h1>
      <div>
        <h2>Root Message:</h2>
        <p>{message || "Loading..."}</p>
      </div>
      <div>
        <h2>Test API Message:</h2>
        <p>{testMessage || "Loading..."}</p>
      </div>
    </div>
  );
}

export default App;
