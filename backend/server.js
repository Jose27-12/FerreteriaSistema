const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar Rutas
const productosRoutes = require('./routes/Productos');
const authRoutes = require('./routes/Auth');
const clientesRoutes = require('./routes/Clientes');
const facturasRoutes = require('./routes/Facturas');  // Nueva ruta
const detalleFacturaRoutes = require('./routes/DetalleFactura'); // Nueva ruta
const usuariosRoutes = require('./routes/Usuario'); // Nueva ruta
const ventasRoutes = require('./routes/Venta'); // Nueva ruta
const proveedoresRoutes = require('./routes/Proveedor');







// Usar Rutas
app.use('/api', productosRoutes); // Cambiado a productosRoutes
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/facturas', facturasRoutes);  // Nueva ruta
app.use('/api/detalle_factura', detalleFacturaRoutes);  // Nueva ruta
app.use('/api', usuariosRoutes); // Nueva ruta
app.use('/api/ventas', ventasRoutes); // Nueva ruta
app.use('/api/proveedores', proveedoresRoutes); // Nueva ruta 



// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
