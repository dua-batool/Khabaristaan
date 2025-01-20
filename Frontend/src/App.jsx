// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import HomePage from './pages/Home/Home';
import Trends from './pages/Trends/Trends';
import Search from './pages/Search/Search';
import Newspapers from './pages/Newspapers/Newspapers';
import Collections from './pages/Collections/Collections';
import Chroma from './pages/Chroma/Chroma';
import AdminPanel from './pages/Admin/AdminPanel';

function App() {
  return (
      <div>
        {/* Define routes here */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/trends' element={<Trends />} />
          <Route path='/search' element={<Search />}/>
          <Route path='/newspapers' element={<Newspapers />}/>
          <Route path='/collections' element={<Collections />} />
          <Route path='/chroma' element={<Chroma />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>
      </div>
  );
}

export default App;
