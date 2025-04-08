// src/pages/Dashboard.jsx
import React from 'react';
import AddProductForm from '../components/AddProductForm';
import ProductTable from '../components/ProductTable';

const Dashboard = () => {
  const cargo = localStorage.getItem('cargo');
  const sede = localStorage.getItem('sede');

  return (
    <div>
      <h1>Panel de productos</h1>
      <AddProductForm cargo={cargo} sede={sede} />
      <hr />
      <ProductTable cargo={cargo} sede={sede} busqueda="" />
    </div>
  );
};

export default Dashboard;
