// backend/controllers/ProductosController.js
const connection = require('../config/connection');

// Obtener todos los productos
const getProductos = (req, res) => {
  connection.query('SELECT id_Producto, id_Sede, Nombre, Precio, Stock FROM producto', (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
};

const buscarProductoPorNombre = (req, res) => {
    const { nombre } = req.params;
    connection.query('SELECT id_Producto, id_Sede, Nombre, Precio, Stock FROM producto WHERE Nombre LIKE ?', [`%${nombre}%`], (err, results) => {
      if (err) {
        console.error('Error al buscar producto por nombre:', err);
        return res.status(500).json({ error: 'Error al buscar producto' });
      }
      res.json(results);
    });
  };

  // Agregar un nuevo producto
  const agregarProducto = (req, res) => {
      const { nombre, precio, stock, id_Categoria, id_Sede} = req.body;
      
    if (!id_Sede || !id_Categoria || !nombre || !precio || !stock) {
      console.error('Faltan campos obligatorios');
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }
  
    const query = 'INSERT INTO producto (Nombre, Precio, Stock, id_Categoria, id_Sede) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nombre, precio, stock, id_Categoria, id_Sede], (err, result) => {
  if (err) {
        console.error('Error al agregar producto:', err);
        return res.status(500).json({ success: false, message: 'Error al agregar producto' });
      }
  
      res.status(201).json({ success: true, message: 'Producto agregado correctamente' });
    });
  };

  const eliminarProducto = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM producto WHERE id_Producto = ?', [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar producto:', err);
        return res.status(500).json({ success: false, message: 'Error al eliminar producto' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }
  
      res.status(200).json({ message: 'Producto eliminado correctamente' });
    });
    
  }

  const editarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
  
    if (!nombre || !precio || !stock) {
      console.error('Faltan campos obligatorios');
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }
  
    const query = 'UPDATE producto SET Nombre = ?, Precio = ?, Stock = ? WHERE id_Producto = ?';
    connection.query(query, [nombre, precio, stock, id], (err, result) => {
      if (err) {
        console.error('Error al editar producto:', err);
        return res.status(500).json({ success: false, message: 'Error al editar producto' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Producto no encontrado' });
      }
  
      res.status(200).json({ success: true, message: 'Producto editado correctamente' });
    });
  }

  
module.exports = {
  getProductos,
  buscarProductoPorNombre,
  agregarProducto,
  eliminarProducto,
  editarProducto,
};
