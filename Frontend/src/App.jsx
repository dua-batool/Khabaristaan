// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import Chroma from './pages/Chroma/Chroma';

function App() {
  return (
      <div>
        {/* Define routes here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/chroma' element={<Chroma />} />
        </Routes>
      </div>
  );
}

export default App;
