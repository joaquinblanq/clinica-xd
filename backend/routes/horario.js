// routes/horario.js

import express from 'express';
import Horario from '../models/horarioModel.js'; // Importa el modelo de Horario

const router = express.Router();

// Crear un nuevo horario
router.post('/horarios', async (req, res) => {
  const { medicoId, diaSemana, horaInicio, horaFin } = req.body;

  try {
    const nuevoHorario = new Horario({
      medicoId,
      diaSemana,
      horaInicio,
      horaFin
    });

    const horarioCreado = await nuevoHorario.save();
    res.status(201).json(horarioCreado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
