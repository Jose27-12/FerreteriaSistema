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
          {cargo !== 'Vendedor' && cargo !== 'Inventario' && (
            <>
              <li><Link to="/usuario">Usuarios</Link></li>

            </>
          )}
          
          <li><Link to="/almacen">Productos</Link></li>
          {cargo !== 'Inventario' && (
            <>
              <li><Link to="/clientes">Clientes</Link></li>
              <li><Link to="/Ventas">Ventas</Link></li>
            </>
          )}
          {cargo !== 'Vendedor' && (
            <li><Link to="/proveedores">Proveedores</Link></li>

          )}
          
          <li><Link to="/configuracion">Configuración</Link></li>


          {cargo !== 'Vendedor' && cargo !== 'Inventario' && (
            <>
              <li><Link to="/notificaciones">Notificaciones</Link></li>

            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
