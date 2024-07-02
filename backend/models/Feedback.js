// models/Feedback.js

import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  medico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medico', // Referencia al modelo Medico
    required: true
  },
  comentario: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
