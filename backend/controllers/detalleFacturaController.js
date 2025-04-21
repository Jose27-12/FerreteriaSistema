const connection = require('../config/connection');

// Crear detalle de factura
const crearDetalleFactura = (req, res) => {

  const { id_Facturacion, id_Producto, Cantidad, Precio_Unitario } = req.body;
  console.log('🛠️ Body recibido en el backend:', req.body);

  if (!id_Facturacion || !id_Producto || !Cantidad || !Precio_Unitario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }


  connection.query(
    'INSERT INTO detalle_factura (id_Facturacion, id_Producto, Cantidad, Precio_Unitario) VALUES (?, ?, ?, ?)',
    [id_Facturacion, id_Producto, Cantidad, Precio_Unitario],
    (err, result) => {
      if (err) {
        console.error('Error al crear detalle de factura:', err);
        return res.status(500).json({ error: 'Error al crear detalle de factura' });
      }

      res.status(201).json({ message: 'Detalle de factura creado con éxito' });
    }
  );
};

module.exports = { crearDetalleFactura };
