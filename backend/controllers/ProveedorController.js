const connection = require('../config/connection');


// Obtener todos los proveedores
const getProveedores = (req, res) => {
    connection.query('SELECT id_Proveedor, Nombre, Telefono, Direccion FROM proveedor', (err, results) => {
      if (err) {
        console.error('Error al obtener Proveedores:', err);
        return res.status(500).json({ error: 'Error al obtener Proveedores' });
      }
      res.json(results);
    });
  };

// Buscar proveedor por nombre
const buscarProveedorPorNombre = (req, res) => {
    const { nombre } = req.params;
    connection.query('SELECT id_Proveedor, Nombre, Telefono, Direccion FROM proveedor WHERE Nombre LIKE ?', [`%${nombre}%`], (err, results) => {
      if (err) {
        console.error('Error al buscar proveedor por nombre:', err);
        return res.status(500).json({ error: 'Error al buscar proveedor' });
      }
      res.json(results);
    });
  }

// Eliminar proveedor
const eliminarProveedor = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM proveedor WHERE id_Proveedor = ?', [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar proveedor:', err);
        return res.status(500).json({ success: false, message: 'Error al eliminar proveedor' });
      }
   
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
      }
   
      res.status(200).json({ message: 'Proveedor eliminado correctamente' });
    });
  }
// Editar proveedor (agregado para completar la funcionalidad)

const editarProveedor = (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, direccion } = req.body;
  
    connection.query(
      'UPDATE proveedor SET Nombre = ?, Telefono = ?, Direccion = ? WHERE id_Proveedor = ?',
      [nombre, telefono, direccion, id],
      (err, result) => {
        if (err) {
          console.error('Error al editar proveedor:', err);
          return res.status(500).json({ success: false, message: 'Error al editar proveedor' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
        }
  
        res.status(200).json({ message: 'Proveedor editado correctamente' });
      }
    );
  }

  const agregarProveedor = (req, res) => {
    const { nombre, telefono, direccion } = req.body;
  
    if ( !nombre || !telefono || !direccion) {
      console.error('Faltan campos obligatorios');
      return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
    }
  
    const query = 'INSERT INTO proveedor (Nombre, Telefono, Direccion) VALUES ( ?, ?, ?)';
    connection.query(query, [nombre, telefono, direccion, ], (err, result) => {
      if (err) {
        console.error('Error al agregar proveedor:', err);
        return res.status(500).json({ success: false, message: 'Error al agregar proveedor' });
      }
  
      res.status(201).json({ success: true, message: 'Proveedor agregado correctamente' });
    });
  }


  module.exports = {
    getProveedores,
    buscarProveedorPorNombre,
    eliminarProveedor,
    editarProveedor,
    agregarProveedor,
  };