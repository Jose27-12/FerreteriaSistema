import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ cargo, isOpen, toggleSidebar }) {
  return (
    <>
      {/* Botón hamburguesa */}
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>Menú</h2>
        <ul>
          <li><Link to="/Inicio">Inicio</Link></li>
          <li><Link to="/usuarios">Usuarios</Link></li>
          <li><Link to="/almacen">Productos</Link></li>
          {cargo !== 'Inventario' && (
            <>
              <li><Link to="/clientes">Clientes</Link></li>
              <li><Link to="/ventas">Ventas</Link></li>
            </>
          )}
          <li><Link to="/proveedores">Proveedores</Link></li>
          <li><Link to="/configuracion">Configuración</Link></li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
