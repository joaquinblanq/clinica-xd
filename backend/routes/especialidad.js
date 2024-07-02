// routes/especialidad.js

import express from 'express';
import Especialidad from '../models/Especialidad.js';

const router = express.Router();

// GET para obtener todas las especialidades
router.get('/especialidades', async (req, res) => {
  try {
    const especialidades = await Especialidad.find();
    res.json(especialidades);
  } catch (error) {
    console.error('Error al obtener especialidades:', error);
    res.status(500).json({ message: 'Error al obtener especialidades' });
  }
});

// POST para crear una nueva especialidad
router.post('/especialidades', async (req, res) => {
  try {
    const { nombre } = req.body;
    const nuevaEspecialidad = new Especialidad({ nombre });
    const especialidadGuardada = await nuevaEspecialidad.save();
    res.status(201).json(especialidadGuardada);
  } catch (error) {
    console.error('Error al crear especialidad:', error);
    res.status(500).json({ message: 'Error al crear especialidad' });
  }
});

export default router;
