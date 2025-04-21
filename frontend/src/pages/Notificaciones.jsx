import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './notificaciones.css';
import axios from 'axios';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const obtenerNotificaciones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/productos/bajo-stock');
        setNotificaciones(response.data);
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
      }
    };

    obtenerNotificaciones();
    const intervalo = setInterval(obtenerNotificaciones, 60000); // 60 segundos

    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="notificaciones-page">
      <Sidebar cargo="Administrador" isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        <h1>Notificaciones</h1>
        <div className="notificaciones-container">
          <ul>
          {notificaciones.map((producto) => (
        <li key={producto.id_Producto} className="notificacion">
            ⚠️ {producto.Nombre} tiene solo {producto.Stock} unidades en stock.
        </li>
))}

          </ul>
        </div>
      </div>
    </div>
  );
}

export default Notificaciones;
