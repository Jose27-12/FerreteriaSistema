import { useState, useEffect } from "react";
import axios from "axios";

// 1. AÑADE 'busqueda' A LAS PROPS RECIBIDAS
const Productos = ({ busqueda, cargo, idSede }) => {
  const [productos, setProductos] = useState([]);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);

  const [editandoId, setEditandoId] = useState(null);
  const [datosEditados, setDatosEditados] = useState({
    nombre: "",
    precio: "",
    stock: "",
  });

  useEffect(() => {
    obtenerProductos();
    // Si necesitas que se actualice si cambia idSede, añádelo al array de dependencias:
  }, [idSede]); // <-- Añadido idSede si la carga depende de ello

  const obtenerProductos = async () => {
    try {
      // Asegúrate que la URL es correcta, si depende de idSede, inclúyelo
      const response = await axios.get("http://localhost:3000/api/productos");
      setProductos(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Función para formatear el precio como pesos colombianos
  const formatearPrecio = (precio) => {
    // Asegúrate que el precio sea un número antes de formatear
    const numPrecio = Number(precio);
    if (isNaN(numPrecio)) {
      return "Precio inválido"; // O maneja el error como prefieras
    }
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0, // Puedes poner 0 si no manejas centavos
      maximumFractionDigits: 0,
    }).format(numPrecio);
  };

  const handleDelete = (id, nombre) => {
    setProductoAEliminar({ id, nombre });
    setMostrarConfirmacion(true);
  };

  const confirmarEliminacion = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/productos/eliminar/${productoAEliminar.id}`);
      setMostrarConfirmacion(false);
      setMensajeExito(true);
      obtenerProductos(); // Recarga la lista

      setTimeout(() => {
        setMensajeExito(false);
      }, 2000);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const manejarEditarClick = (producto) => {
    setEditandoId(producto.id_Producto);
    setDatosEditados({
      nombre: producto.Nombre,
      precio: producto.Precio,
      stock: producto.Stock,
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
  };

  const guardarCambios = async () => {
    try {
      await axios.put(`http://localhost:3000/api/productos/editar/${editandoId}`, {
        nombre: datosEditados.nombre,
        precio: datosEditados.precio,
        stock: datosEditados.stock,
      });
      setEditandoId(null);
      obtenerProductos(); // Recarga la lista
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  return (
    <>
      {/* ... (modales de confirmación y edición se mantienen igual) ... */}
       {mensajeExito && (
        <div className="overlay">
          <div className="mensaje-exito">✅ Producto eliminado correctamente</div>
        </div>
      )}

      {mostrarConfirmacion && (
        <div className="overlay">
          <div className="mensaje-exito">
            <p>
              ¿Estás seguro de que deseas eliminar el producto{" "}
              <strong>{productoAEliminar.nombre}</strong>?
            </p>
            <div className="botones-confirmacion">
              <button onClick={confirmarEliminacion}>Sí</button>
              <button onClick={() => setMostrarConfirmacion(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edición */}
      {editandoId !== null && (
        <div className="overlay">
          <div className="modal-edicion">
            <h3>Editar producto</h3>
            <label>Nombre:</label>
            <input
              type="text"
              value={datosEditados.nombre}
              onChange={(e) =>
                setDatosEditados({ ...datosEditados, nombre: e.target.value })
              }
            />
            <label>Precio:</label>
            <input
              type="number"
              value={datosEditados.precio}
              onChange={(e) =>
                setDatosEditados({ ...datosEditados, precio: e.target.value })
              }
            />
            <label>Stock:</label>
            <input
              type="number"
              value={datosEditados.stock}
              onChange={(e) =>
                setDatosEditados({ ...datosEditados, stock: e.target.value })
              }
            />
            <div className="botones-modal">
              <button onClick={guardarCambios}>💾 Guardar</button>
              <button onClick={cancelarEdicion}>❌ Cancelar</button>
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
          {/* 2. APLICA EL FILTRO ANTES DEL MAP */}
          {productos
            .filter((producto) => {
              // Si no hay búsqueda, devuelve todos
              if (!busqueda) return true;
              // Convierte a minúsculas para búsqueda insensible
              const busquedaLower = busqueda.toLowerCase();
              // Busca en el nombre del producto (puedes añadir más campos)
              return producto.Nombre.toLowerCase().includes(busquedaLower);
              
            })
            .map((producto) => (
              <tr key={producto.id_Producto}>
                <td>{producto.id_Producto}</td>
                <td>{producto.id_Sede}</td>
                <td>{producto.Nombre}</td>
                <td>{formatearPrecio(producto.Precio)}</td>
                <td>{producto.Stock}</td>
                <td>
                  {cargo === "Vendedor" ? (
                    <button className="sell-btn">🛒 añadir</button>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => manejarEditarClick(producto)}
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(producto.id_Producto, producto.Nombre)
                        }
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
};

export default Productos;