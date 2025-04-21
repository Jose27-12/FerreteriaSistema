const connection = require('../config/connection');

// Obtener todos los clientes
const getClientes = (req, res) => {
    connection.query('SELECT id_Cliente, Nombre, Apellido, Telefono, Direccion, Correo FROM cliente', (err, results) => {
      if (err) {
        console.error('Error al obtener Clientes:', err);
        return res.status(500).json({ error: 'Error al obtener Clientes' });
      }
      res.json(results);
    });
  };

// Buscar cliente por nombre
const buscarClientePorNombre = (req, res) => {
    const { nombre } = req.params;
    connection.query('SELECT id_Cliente, Nombre, Apellido, Telefono, Direccion, Correo FROM cliente WHERE Nombre LIKE ?', [`%${nombre}%`], (err, results) => {
      if (err) {
        console.error('Error al buscar cliente por nombre:', err);
        return res.status(500).json({ error: 'Error al buscar cliente' });
      }
      res.json(results);
    });
  }

// Eliminar cliente

const eliminarCliente = (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM cliente WHERE id_Cliente = ?', [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar cliente:', err);
        return res.status(500).json({ success: false, message: 'Error al eliminar cliente' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
      }
  
      res.status(200).json({ message: 'Cliente eliminado correctamente' });
    });
  }

// Editar cliente (agregado para completar la funcionalidad)
const editarCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, telefono, direccion, correo } = req.body;
  
    connection.query(
      'UPDATE cliente SET Nombre = ?, Apellido = ?, Telefono = ?, Direccion = ?, Correo = ? WHERE id_Cliente = ?',
      [nombre, apellido, telefono, direccion, correo, id],
      (err, result) => {
        if (err) {
          console.error('Error al editar cliente:', err);
          return res.status(500).json({ success: false, message: 'Error al editar cliente' });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
        }
  
        res.status(200).json({ success: true, message: 'Cliente editado correctamente' });
      }
    );
  }

  // Crear un nuevo cliente
const crearCliente = (req, res) => {
  const { nombre, apellido, telefono, direccion, correo } = req.body;

  if (!nombre || !apellido || !telefono || !direccion || !correo) {
    return res.status(400).json({ error: 'Faltan datos del cliente' });
  }

  connection.query(
    'INSERT INTO cliente (Nombre, Apellido, Telefono, Direccion, Correo) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, telefono, direccion, correo],
    (err, result) => {
      if (err) {
        console.error('Error al crear cliente:', err);
        return res.status(500).json({ error: 'Error al crear cliente' });
      }

      res.status(201).json({ 
        message: 'Cliente creado con éxito', 
        id_cliente: result.insertId 
      });
    }
  );
};


module.exports = {
    getClientes,
    buscarClientePorNombre,
    eliminarCliente,
    editarCliente, 
    crearCliente,
};