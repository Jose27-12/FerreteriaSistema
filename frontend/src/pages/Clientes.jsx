import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ClienteTable from '../components/ClienteTable';
import { useNavigate } from 'react-router-dom';

import './admin.css';

function Clientes() {
  const [busqueda, setBusqueda] = useState('');
  const [cargo, setCargo] = useState('');
  const [sede, setSede] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  useEffect(() => {
    const storedCargo = localStorage.getItem('cargo');
    const storedSede = localStorage.getItem('sede');
    setCargo(storedCargo);
    setSede(storedSede);
  }, []);


  const navigate = useNavigate();


  return (
    <div className="almacen-page">
      <Sidebar cargo={cargo} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        <h1>Clientes</h1>
        <input
            type="text"
            placeholder="Buscar Cliente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
        /> 
        <ClienteTable busqueda={busqueda} cargo={cargo} sede={sede} />
      </div>
    </div>
  );
}

export default Clientes;
