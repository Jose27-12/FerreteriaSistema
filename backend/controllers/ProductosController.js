// backend/controllers/ProductosController.js
const connection = require('../config/connection');

// Obtener todos los productos
const getProductos = (req, res) => {
  const { sede } = req.query;

  let query = 'SELECT id_Producto, id_Sede, Nombre, Precio, Stock FROM producto';
  let params = [];

  if (sede) {
    query += ' WHERE id_Sede = ?';
    params.push(sede);
  }

  connection.query(query, params, (err, results) => {
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

  // Actualizar el stock de un producto
  const actualizarStock = (req, res) => {
    const { id_Producto } = req.params;
    const { cantidad } = req.body; 
    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({ success: false, message: 'Cantidad inválida' });
    }
  
    // Primero obtenemos el stock actual
    connection.query('SELECT Stock, Nombre FROM producto WHERE id_Producto = ?', [id_Producto], (err, results) => {
      if (err || results.length === 0) {
        return res.status(500).json({ success: false, message: 'Error al consultar stock actual' });
      }
      const stockActual = Number(results[0].Stock);
      const nombreProducto = results[0].Nombre;
      const cantidadVendida = Number(producto.cantidad);
      const nuevoStock = stockActual - cantidadVendida;
  
      if (isNaN(nuevoStock < 0)) {
        return res.status(400).json({ success: false, message: 'Stock insuficiente' });
      }
  
      // Actualizamos el nuevo stock
     connection.query('UPDATE producto SET Stock = ? WHERE id_Producto = ?', [nuevoStock, id_Producto], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error al actualizar stock' });
        }
  
        notificarStockBajo(nombreProducto, nuevoStock);
  
        res.status(200).json({ success: true, message: 'Stock actualizado correctamente', stock: nuevoStock });
      });
    });
  };
  


// Obtener productos con stock bajo (<=10)
const getProductosBajoStock = (req, res) => {
  const query = 'SELECT * FROM producto WHERE Stock <= 10';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos con stock bajo:', err);
      return res.status(500).json({ error: 'Error al obtener productos con stock bajo' });
    }
    res.json(results);
  });
};

function notificarStockBajo(nombreProducto, stock) {
  if (stock <= 10) {
    console.log(`⚠️  Alerta: El producto "${nombreProducto}" tiene solo ${stock} unidades en stock.`);
  }
}


const getProductosMasVendidos = (req, res) => {
  const rango = req.query.rango;

  let condicionFecha = '';
  if (rango === 'diario') {
    condicionFecha = 'DATE(f.fecha) = CURDATE()';
  } else if (rango === 'semanal') {
    condicionFecha = 'YEARWEEK(f.fecha, 1) = YEARWEEK(CURDATE(), 1)';
  } else if (rango === 'mensual') {
    condicionFecha = 'MONTH(f.fecha) = MONTH(CURDATE()) AND YEAR(f.fecha) = YEAR(CURDATE())';
  } else {
    return res.status(400).json({ error: 'Parámetro "rango" inválido. Usa diario, semanal o mensual.' });
  }

  const query = `
    SELECT p.Nombre AS nombre_producto, 
           SUM(df.cantidad) AS total_vendidos,
           SUM(df.precio_unitario * df.cantidad) AS ingresos
    FROM facturacion f
    JOIN detalle_factura df ON f.id_facturacion = df.id_facturacion
    JOIN producto p ON df.id_producto = p.id_producto
    WHERE ${condicionFecha}
    GROUP BY p.id_producto
    ORDER BY total_vendidos DESC
    LIMIT 8;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos más vendidos:', err);
      return res.status(500).json({ error: 'Error en la consulta de productos más vendidos' });
    }

    res.json(results);
  });
};

  
module.exports = {
  getProductos,
  buscarProductoPorNombre,
  agregarProducto,
  eliminarProducto,
  editarProducto,
  actualizarStock,
  getProductosBajoStock,
  getProductosMasVendidos,
};
