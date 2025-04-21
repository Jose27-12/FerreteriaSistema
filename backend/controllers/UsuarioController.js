const connection = require('../config/connection');


const getUsuarios = (req, res) => {
    const { usuario } = req.query;  // <-- recibes el usuario como parámetro de consulta

    let query = `
       SELECT 
    u.id_Usuario,
    u.usuario,
    u.Cargo,
    u.id_Sede,
    e.nombre,
    e.telefono
FROM 
    usuario u
JOIN 
    empleado e
ON 
    u.id_empleado = e.id_empleado

    `;

    let params = [];

    if (usuario) {
        query += ' WHERE u.usuario = ?';
        params.push(usuario);
    }

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.json(results);
    });
};

const eliminarUsuario = (req, res) => {
  const { id } = req.params;

  // 1. Obtener el id_empleado del usuario
  const obtenerUsuario = 'SELECT id_empleado FROM usuario WHERE id_Usuario = ?';

  connection.query(obtenerUsuario, [id], (err, results) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ error: 'Error al buscar usuario' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const { id_empleado } = results[0];

    // 2. Eliminar usuario
    const eliminarUsuarioQuery = 'DELETE FROM usuario WHERE id_Usuario = ?';

    connection.query(eliminarUsuarioQuery, [id], (err) => {
      if (err) {
        console.error('Error al eliminar usuario:', err);
        return res.status(500).json({ error: 'Error al eliminar usuario' });
      }

      // 3. Eliminar empleado relacionado
      const eliminarEmpleado = 'DELETE FROM empleado WHERE id_empleado = ?';

      connection.query(eliminarEmpleado, [id_empleado], (err) => {
        if (err) {
          console.error('Error al eliminar empleado:', err);
          return res.status(500).json({ error: 'Error al eliminar empleado' });
        }

        res.status(200).json({ success: true, message: 'Usuario y empleado eliminados correctamente' });
      });
    });
  });
};



  

module.exports = {
    getUsuarios,
    eliminarUsuario
};
