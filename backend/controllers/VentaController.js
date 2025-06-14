const connection = require('../config/connection');

const obtenerVentas = (req, res) => {
  const sql = `
    SELECT DISTINCT f.id_facturacion, f.fecha, f.total, 
        c.nombre AS nombre_cliente, c.apellido, 
        p.Nombre AS nombre_producto, df.cantidad, df.precio_unitario
 FROM facturacion f
 JOIN cliente c ON f.id_cliente = c.id_cliente
 JOIN detalle_factura df ON f.id_facturacion = df.id_facturacion
 JOIN producto p ON df.id_producto = p.id_producto
 ORDER BY f.fecha DESC;

  `;

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener ventas:', err);
      return res.status(500).json({ error: 'Error al obtener ventas' });
    }

    res.json(results);
  });
};

const buscarVentaPorNombre = (req, res) => {
  const { nombre } = req.params;
  const sql = `
    SELECT f.id_facturacion, f.fecha, f.total, 
           c.nombre AS nombre_cliente, c.apellido, 
           p.Nombre AS nombre_producto, df.cantidad, df.precio_unitario
    FROM facturacion f
    JOIN cliente c ON f.id_cliente = c.id_cliente
    JOIN detalle_factura df ON f.id_facturacion = df.id_facturacion
    JOIN producto p ON df.id_producto = p.id_producto
    WHERE c.nombre LIKE ? OR p.Nombre LIKE ?
    ORDER BY f.fecha DESC
  `;

  connection.query(sql, [`%${nombre}%`, `%${nombre}%`], (err, results) => {
    if (err) {
      console.error('Error al buscar venta por nombre:', err);
      return res.status(500).json({ error: 'Error al buscar venta' });
    }

    res.json(results);
  });
};

// Registrar una nueva venta
const registrarVenta = (req, res) => {
  const { id_Cliente, Fecha, Total } = req.body;

  const sql = `
    INSERT INTO venta (id_Cliente, Fecha, Total)
    VALUES (?, ?, ?)
  `;

  connection.query(sql, [id_Cliente, Fecha, Total], (err, result) => {
    if (err) {
      console.error('Error al registrar venta:', err);
      return res.status(500).json({ error: 'Error al registrar la venta' });
    }

    res.status(201).json({ message: 'Venta registrada exitosamente', id_venta: result.insertId });
  });
};


module.exports = { 
  obtenerVentas,
  buscarVentaPorNombre,
  registrarVenta,
};
