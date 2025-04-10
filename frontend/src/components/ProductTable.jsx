import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductTable({ busqueda, cargo, sede }) {
  const [productos, setProductos] = useState([]);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [idAEliminar, setIdAEliminar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  

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

  const confirmarEliminacion = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/productos/eliminar/${idAEliminar}`);
      setMensajeExito(true);
      setTimeout(() => setMensajeExito(false), 600);
  
      setProductos((prev) =>
        prev.filter((producto) => producto.id_Producto !== idAEliminar)
      );
    } catch (error) {
      console.error("❌ Error al eliminar el producto:", error);
      alert("❌ No se pudo eliminar el producto");
    } finally { 
      setMostrarConfirmacion(false);
      setIdAEliminar(null);
    }
  };

  const handleDelete = (id, nombre) => {
    setIdAEliminar(id);
    setProductoAEliminar(nombre);
    setMostrarConfirmacion(true);
  };
  
  
  

  return (
    
    <>
      {mensajeExito && (
        <div className="overlay">
          <div className="mensaje-exito">
            ✅ Producto eliminado correctamente
          </div>
        </div>
      )}

    {mostrarConfirmacion && (
      <div className="overlay">
        <div className="mensaje-exito">
          <p> ¿Estás seguro de que deseas eliminar este producto  <strong>{productoAEliminar}</strong>?</p>
          
          <div className="botones-confirmacion">
            <button onClick={confirmarEliminacion}>Sí</button>
            <button onClick={() => setMostrarConfirmacion(false)}>Cancelar</button>
          </div>
        </div>
      </div>
    )}

  
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
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(producto.id_Producto, producto.Nombre)}
                    >
                      🗑️
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
  
}

export default ProductTable;
