import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Iniciosesion from './vista/Iniciosesion';
import Dashboard from './vista/Dashboard';
import Registrar from './vista/Registrar'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Iniciosesion />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registrar" element={<Registrar />} />
      </Routes>
    </Router>
  );
};

export default App;