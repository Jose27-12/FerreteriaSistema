import React, { useState } from 'react';
import axios from 'axios';

function AddProductForm({ cargo, sede }) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [sedeSeleccionada, setSedeSeleccionada] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nombre,
      precio: parseFloat(precio),
      stock: parseInt(stock),
      id_Sede: cargo === 'Admin' ? parseInt(sedeSeleccionada) : parseInt(sede),
      id_categoria: parseInt(categoriaSeleccionada),
    };

    try {
      const res = await axios.post('http://localhost:3000/api/productos/agregar', data);
      if (res.data.success) {
        alert('✅ Producto agregado correctamente');
        setNombre('');
        setPrecio('');
        setStock('');
        setSedeSeleccionada('');
        setCategoriaSeleccionada('');
      } else {
        alert('❌ No se pudo agregar el producto');
      }
    } catch (err) {
      console.error('Error al enviar producto:', err);
      alert('❌ Error al conectar con el servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
      />

      {cargo === 'Admin' ? (
        <select
          value={sedeSeleccionada}
          onChange={(e) => setSedeSeleccionada(e.target.value)}
          required
        >
          <option value="">Seleccionar sede</option>
          <option value="1">Sede 1</option>
          <option value="2">Sede 2</option>
        </select>
      ) : (
        <input type="hidden" value={sede} />
      )}

      <select
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        required
      >
        <option value="">Seleccionar categoría</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      <button type="submit">Guardar Producto</button>
    </form>
  );
}

export default AddProductForm;
