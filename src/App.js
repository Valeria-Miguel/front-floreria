import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Iniciosesion from './vista/Iniciosesion';
import Dashboard from './vista/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Iniciosesion />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;