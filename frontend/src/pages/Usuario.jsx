import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import UsuarioTable from '../components/UsuarioTable';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './admin.css';

function Usuarios() {
  const [busqueda, setBusqueda] = useState('');
  const [cargo, setCargo] = useState('');
  const [sede, setSede] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const fetchUsuarios = async () => {
    try {
      const storedSede = localStorage.getItem('sede');
      const response = await fetch(`http://localhost:3000/api/usuarios?id_Sede=${storedSede}`);
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedCargo = localStorage.getItem('cargo');
    const storedSede = localStorage.getItem('sede');
    if (storedCargo) setCargo(storedCargo);
    if (storedSede) setSede(storedSede);

    fetchUsuarios(); // Llama a la función cuando el componente se monta
  }, []);

  const usuariosFiltrados = usuarios.filter((usuario) =>
    `${usuario.Nombre} ${usuario.Apellido}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="almacen-page">
      <Sidebar cargo={cargo} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        <div className="header-productos">
          <h1>Usuarios</h1>
        </div>

        <input
          type="text"
          placeholder="Buscar usuario..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="search-input"
        />

        {/* 👉 Aquí sí pasamos fetchUsuarios como prop */}
        <UsuarioTable usuarios={usuariosFiltrados} obtenerUsuarios={fetchUsuarios} />
      </div>
    </div>
  );
}

export default Usuarios;
