import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ProductTable from '../components/ProductTable';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './admin.css';

function Almacen() {
  const [busqueda, setBusqueda] = useState('');
  const [cargo, setCargo] = useState('');
  const [sede, setSede] = useState('');

  useEffect(() => {
    const storedCargo = localStorage.getItem('cargo');
    const storedSede = localStorage.getItem('sede');
    setCargo(storedCargo);
    setSede(storedSede);
  }, []);


  const navigate = useNavigate();


  return (
    <div className="almacen-page">
      <Sidebar />
      <div className="main-content">
        <h1>Productos</h1>
        <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* Mostrar el botón de agregar solo si NO es vendedor */}
       {cargo !== 'Vendedor' && (
        <button className="add-product-btn" onClick={() => navigate('/agregar-producto')}>
            <FaPlus />
        </button>
)}

        <ProductTable busqueda={busqueda} cargo={cargo} sede={sede} />
      </div>
    </div>
  );
}

export default Almacen;
