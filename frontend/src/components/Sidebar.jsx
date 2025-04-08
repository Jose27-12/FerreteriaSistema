import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
        <h2>Menú</h2>
        <ul>
            <li><Link to="/Inicio">Inicio</Link></li>
            <li><Link to="/usuarios">Usuarios</Link></li>
            <li><Link to="/almacen">Productos</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/ventas">Ventas</Link></li>
            <li><Link to="/proveedores">Proveedores</Link></li>
            <li><Link to="/configuracion">configuración</Link></li>
        </ul>
        </div>
    );
}

export default Sidebar;
