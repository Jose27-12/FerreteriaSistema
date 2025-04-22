// controllers/NotificacionController.js
const Notificacion = require('../models/Notificacion'); // Importar modelo

exports.enviarNotificacion = async (req, res) => {
  try {
    const { mensaje, rol, id_cliente, productos } = req.body;

    // Lógica para guardar la notificación en la base de datos (si es necesario)
    const nuevaNotificacion = new Notificacion({
      mensaje,
      rol,
      id_cliente,
      productos
    });

    // Guardar en la base de datos
    await nuevaNotificacion.save();

    // Responder con éxito
    res.status(200).json({ success: true, message: 'Notificación enviada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Hubo un error al enviar la notificación' });
  }
};
