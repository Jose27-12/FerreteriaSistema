const connection = require('../config/connection'); // ✅ nombre correcto

const login = (req, res) => {
  const { usuario, contrasena } = req.body;
  const sql = 'SELECT Cargo, id_Sede FROM usuario WHERE usuario = ? AND Contraseña = ?';

  connection.query(sql, [usuario, contrasena], (err, results) => { // ✅ aquí también
    if (err) {
      console.error('Error en la consulta SQL:', err); // 👉 imprime el error real
      return res.status(500).json({ message: 'Error en el servidor', err });
    }

    if (results.length > 0) {
        const { Cargo, id_Sede } = results[0];
        return res.json({ success: true, cargo: Cargo, id_Sede });
    } else {
        return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  });
};

const register = (req, res) => {
  const { nombre, telefono, cargo, id_Sede, correo, contraseña } = req.body;

  // Insertar en EMPLEADO primero
  const insertEmpleado = 'INSERT INTO empleado (nombre, cargo, telefono, id_Sede) VALUES (?, ?, ?, ?)';
  connection.query(insertEmpleado, [nombre, cargo, telefono, id_Sede], (err, result) => {
    if (err) {
      console.error('Error al registrar empleado:', err);
      return res.status(500).json({ error: 'Error al registrar empleado', details: err });
    }

    const idEmpleado = result.insertId; // Obtén el id_empleado generado por la inserción del empleado

    // Insertar en USUARIO (correo = usuario) y asociar el id_empleado
    const insertUsuario = 'INSERT INTO usuario (Contraseña, Cargo, id_Sede, usuario, id_empleado) VALUES (?, ?, ?, ?, ?)';
    connection.query(insertUsuario, [contraseña, cargo, id_Sede, correo, idEmpleado], (err2) => {
      if (err2) {
        console.error('Error al registrar usuario:', err2);
        return res.status(500).json({ error: 'Error al registrar usuario', details: err2 });
      }

      res.status(201).json({ mensaje: 'Usuario y empleado registrados exitosamente' });
    });
  });
};

const cambiarContrasena = (req, res) => {
  console.log("BODY recibido en el backend:", req.body); // 👈 este log es clave
  const { correo, nuevaContrasena } = req.body;

  if (!correo || !nuevaContrasena) {
    return res.status(400).json({ success: false, message: "Faltan datos requeridos." });
  }

  const sql = 'UPDATE usuario SET Contraseña = ? WHERE usuario = ?';

  connection.query(sql, [nuevaContrasena, correo], (err, result) => {
    if (err) {
      console.error("Error al cambiar contraseña:", err);
      return res.status(500).json({ success: false, message: "Error del servidor", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado." });
    }

    res.json({ success: true, message: "Contraseña actualizada correctamente." });
  });
};



module.exports = { 
  login, 
  register,
  cambiarContrasena,
};
