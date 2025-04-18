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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const storedCargo = localStorage.getItem('cargo');
    const storedSede = localStorage.getItem('sede');
    if (storedCargo) setCargo(storedCargo);
    if (storedSede) setSede(storedSede);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="almacen-page">
      <Sidebar cargo={cargo} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        <h1>Productos</h1>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />
        {cargo && cargo !== 'Vendedor' && (
          <button className="add-product-btn" onClick={() => navigate('/agregar-producto')}>
            <FaPlus /> Agregar Producto
          </button>
        )}
        <ProductTable busqueda={busqueda} cargo={cargo} sede={sede} />
      </div>
    </div>
  );
}

export default Almacen;
