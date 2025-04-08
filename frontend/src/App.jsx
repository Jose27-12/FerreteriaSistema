import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Almacen from './pages/Almacen';
import AddProductForm from './components/AddProductForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/almacen" element={<Almacen />} />
        <Route path="/agregar-producto" element={<AddProductForm />} />

      </Routes>
    </Router>
  );
}

export default App;
