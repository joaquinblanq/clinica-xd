import express from 'express';
import Medico from '../models/Medico.js';
import Especialidad from '../models/Especialidad.js';

const router = express.Router();

// Crear un nuevo médico
router.post('/medicos', async (req, res) => {
  try {
    const { nombre, telefono, especialidad } = req.body;
    const newMedico = new Medico({ nombre, telefono, especialidad });
    await newMedico.save();
    res.status(201).json(newMedico);
  } catch (error) {
    console.error('Error al crear médico:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener todos los médicos con especialidades
router.get('/medicos', async (req, res) => {
  try {
    const medicos = await Medico.find().populate('especialidad');
    res.status(200).json(medicos);
  } catch (error) {
    console.error('Error al obtener médicos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;