// index.js o app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Importar Rutas
const productosRoutes = require('./routes/Productos');
const authRoutes = require('./routes/Auth');

// Usar Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/auth', authRoutes);




// Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
