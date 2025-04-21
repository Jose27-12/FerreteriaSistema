const connection = require('../config/connection');
const { actualizarStock } = require('./ProductosController'); // Importar la función actualizarStock

const crearFactura = (req, res) => {
  const { id_cliente, id_sede, fecha, total, productos } = req.body;

  if (!id_cliente || !id_sede || !fecha || !total || !productos) {
    return res.status(400).json({ error: 'Faltan datos de la factura o cliente' });
  }

  connection.beginTransaction(async (err) => {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      return res.status(500).json({ error: 'Error al iniciar la transacción' });
    }

    try {
      // Insertar la factura
      
      const [result] = await connection.promise().query(
        'INSERT INTO facturacion (id_Cliente, id_Sede, Fecha, Total) VALUES (?, ?, ?, ?)',
        [id_cliente, id_sede, fecha, total]
      );

      
      const id_factura = result.insertId;
  


      // Esperar a que todas las inserciones de productos terminen
      const productoPromises = productos.map(async (producto) => {
        // Insertar el detalle de la factura
        await connection.promise().query(
          'INSERT INTO detalle_factura (id_Facturacion, id_Producto, Cantidad, Precio_Unitario) VALUES (?, ?, ?, ?)',
          [id_factura, producto.id_producto, producto.cantidad, producto.precio_unitario]
        );

  // Obtener el stock actual del producto
          const [rows] = await connection.promise().query(
            'SELECT Stock FROM producto WHERE id_Producto = ?',
            [producto.id_producto]
          );

          const stockActual = Number(rows[0]?.Stock); // asegúrate de convertir a número
          const cantidadVendida = Number(producto.cantidad);
          const nuevoStock = stockActual - cantidadVendida;

          if (isNaN(nuevoStock)) {
            throw new Error(`Error de stock: valores inválidos para el producto ${producto.id_producto}`);
          }

          if (nuevoStock < 0) {
            throw new Error(`No hay suficiente stock del producto ${producto.id_producto}`);
          }

          // Actualizar el stock
          await connection.promise().query(
            'UPDATE producto SET Stock = ? WHERE id_Producto = ?',
            [nuevoStock, producto.id_producto]
          );
        });

      
      // Esperar que todos los productos se procesen
      await Promise.all(productoPromises);

      // Confirmar la transacción
      connection.commit((err) => {
        if (err) {
          console.error('Error al confirmar la transacción:', err);
          return connection.rollback(() => {
            res.status(500).json({ error: 'Error al confirmar la transacción' });
          });
        }
        res.status(200).json({ message: 'Factura creada exitosamente' });
      });
    } catch (err) {
      console.error('Error al crear factura:', err);
      return connection.rollback(() => {
        res.status(500).json({ error: 'Error al crear factura' });
      });
    }
  });
};

module.exports = { crearFactura };
