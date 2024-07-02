// models/Especialidad.js

import mongoose from 'mongoose';

const especialidadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  }
});

const Especialidad = mongoose.model('Especialidad', especialidadSchema);

export default Especialidad;
