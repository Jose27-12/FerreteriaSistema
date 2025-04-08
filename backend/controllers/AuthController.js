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

module.exports = { login };
