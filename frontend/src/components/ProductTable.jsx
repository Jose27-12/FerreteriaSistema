import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductTable({ busqueda, cargo, sede }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        let url =
          busqueda.trim() === ''
            ? 'http://localhost:3000/api/productos'
            : `http://localhost:3000/api/productos/buscar/${encodeURIComponent(busqueda)}`;

        const res = await axios.get(url);

        // Si es vendedor O de Inventario, filtra por su sede
        const productosFiltrados =
          cargo === 'Vendedor' || cargo === 'Inventario'
            ? res.data.filter((p) => p.id_Sede === parseInt(sede))
            : res.data;

        setProductos(productosFiltrados);
      } catch (err) {
        console.error('Error al obtener productos:', err);
      }
    };

    fetchProductos();
  }, [busqueda, cargo, sede]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Sede</th>
          <th>Producto</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id_Producto}>
            <td>{producto.id_Producto}</td>
            <td>{producto.id_Sede}</td>
            <td>{producto.Nombre}</td>
            <td>${producto.Precio}</td>
            <td>{producto.Stock}</td>
            <td>
                {cargo === 'Vendedor' ? (
                <button className="sell-btn">🛒 añadir</button>
              ) : (
                <>
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn">🗑️</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
