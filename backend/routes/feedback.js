// routes/feedback.js

import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// POST para crear feedback
router.post('/feedback', async (req, res) => {
  try {
    const { medicoId, comentario, rating } = req.body;

    const nuevoFeedback = new Feedback({
      medico: medicoId,
      comentario,
      rating
    });

    const feedbackCreado = await nuevoFeedback.save();
    res.status(201).json(feedbackCreado);
  } catch (error) {
    console.error('Error al crear feedback:', error);
    res.status(500).json({ message: 'Error al crear feedback' });
  }
});

export default router;
