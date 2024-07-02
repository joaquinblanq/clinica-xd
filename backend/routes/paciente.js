import express from 'express';
import Paciente from '../models/Paciente.js';
import transporter from '../nodemailerConfig.js'; // Importar el transporte de correo
import moment from 'moment';

const router = express.Router();

// Ruta para obtener todos los pacientes
router.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.status(200).json(pacientes);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Ruta para crear un nuevo paciente y enviar correo electrónico
router.post('/pacientes', async (req, res) => {
  try {
    const {
      nombre,
      edad,
      genero,
      telefono,
      direccion,
      email,
      especialidad,
      medico,
      horario
    } = req.body;

    // Validar campos requeridos (como en el ejemplo anterior)

    // Verificar si ya existe un paciente con el mismo horario, médico y fecha
    const existingPaciente = await Paciente.findOne({ horario, medico });

    if (existingPaciente) {
      return res.status(400).json({ error: 'Ya hay un paciente registrado con el mismo horario y médico' });
    }

    const newPaciente = new Paciente({
      nombre,
      edad,
      genero,
      telefono,
      direccion,
      email,
      especialidad,
      medico,
      horario
    });

    await newPaciente.save();

    // Configuración del correo electrónico
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Confirmación de registro y solicitud de turno',
      text: `Estimado/a ${nombre},\n\nSu registro y solicitud de turno han sido realizados exitosamente.\n\nDetalles del turno:\nEspecialidad: ${especialidad}\nMédico: ${medico}\nHorario: ${moment(horario).format('DD/MM/yyyy HH:mm')}\n\nSaludos,\nEquipo Médico`
    };

    // Enviar el correo electrónico usando el transporte configurado
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
        return res.status(500).json({ error: 'Error al enviar el correo electrónico' });
      } else {
        console.log('Correo electrónico enviado:', info.response);
        res.status(201).json({ message: 'Paciente registrado y correo electrónico enviado exitosamente' });
      }
    });

  } catch (error) {
    console.error('Error al registrar paciente y enviar correo:', error);
    res.status(500).json({ error: 'Error interno del servidor al registrar paciente y enviar correo' });
  }
});

// Ruta para eliminar un paciente por ID
router.delete('/pacientes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pacienteEliminado = await Paciente.findByIdAndDelete(id);
    if (!pacienteEliminado) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.status(200).json({ message: 'Paciente eliminado correctamente' });
  } catch (error) {
    console.error(`Error al eliminar paciente con ID ${id}:`, error);
    res.status(500).json({ error: 'Error interno del servidor al eliminar paciente' });
  }
});

// Ruta para actualizar un paciente por ID
router.put('/pacientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, edad, genero, telefono, direccion, email, especialidad, medico, horario } = req.body;

  try {
    const pacienteActualizado = await Paciente.findByIdAndUpdate(id, {
      nombre,
      edad,
      genero,
      telefono,
      direccion,
      email,
      especialidad,
      medico,
      horario
    }, { new: true });

    if (!pacienteActualizado) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }

    res.status(200).json({ message: 'Paciente actualizado correctamente', paciente: pacienteActualizado });
  } catch (error) {
    console.error(`Error al actualizar paciente con ID ${id}:`, error);
    res.status(500).json({ error: 'Error interno del servidor al actualizar paciente' });
  }
});

export default router;
